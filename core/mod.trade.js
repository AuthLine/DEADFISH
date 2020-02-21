
// Trade Handling Module

const epibot_module = require('./mod.base')
var context = require('express-http-context');


module.exports = class epibot_trade_module extends epibot_module {

    // Constructor

    constructor() {
        super()
        this.connpool = {};
    }

    // Initialize connection pool

    /*
    async exchange_init(stub) {
        var uuid = context.get('uuid');
        if (uuid == undefined) uuid = this.encryption.uuid();
        if (!this.connpool.hasOwnProperty(uuid)) this.connpool[uuid] = {};
        if (!this.connpool[uuid].hasOwnProperty(stub)) this.connpool[uuid][stub] = new this.classes.exchange(stub);
        if (!(typeof(this.connpool[uuid][stub]) == 'object' && this.connpool[uuid][stub].constructor.name == 'epibot_exchange')) {
            console.log('reinit')
            this.connpool[uuid][stub] = new this.classes.exchange(stub);
        }
        if (typeof(this.connpool[uuid][stub]) == 'object' && this.connpool[uuid][stub].constructor.name == 'epibot_exchange') {
            console.log('Connection Pool Size: ' + Object.values(this.connpool[uuid]).length);
            return [uuid, stub];
        }
        return false;
    }
    */

    // Execute exchange method

    async exchange_execute(stub, method, params) {
        var exchange = new this.classes.exchange(stub);
        return await exchange.execute(stub, method, params);
        /*
        var uuid = context.get('uuid');
        var exchange = await this.exchange_init(stub);
        if (exchange !== false) {
            var [uuid, stub] = exchange;
            return await this.connpool[uuid][stub].execute(stub, method, params);
        }
        return false;
        */
    }


    // Get exchange setting

    async exchange_get(stub, setting) {
        var exchange = new this.classes.exchange(stub);
        return await exchange.get(stub, setting);
        /*
        var uuid = context.get('uuid');
        var exchange = await this.exchange_init(stub);
        if (exchange !== false) {
            var [uuid, stub] = exchange;
            return await this.connpool[uuid][stub].get(stub, setting);
        }
        return undefined;
        */
    }


    // Check if an order is an advanced order (layered orders, relative pricing, etc)

    order_is_advanced(price) {
        return this.price_is_layered(price) || this.is_relative(price);
    }


    // Check if order pricing is layered

    price_is_layered(price) {
        return (String(price).indexOf(',') > 0 ? true : false);
    }


    // Check if number is relative (starts with + or -)

    is_relative(num) {
        return (['+','-'].includes(String(num).substr(0,1)) ? true : false);
    }


    // Flip relative price
    flip_relative(num) {
        if (num == undefined) return undefined
        if (!this.is_relative(num)) return num
        var operator = this.get_operator(num)
        flip = operator == '+' ? '-' : '+';
        return num.replace(operator, flip);
    }

    
    // Round a number to a given precision

    round_num(num, precision) {
        return (Math.round(num / precision) * precision).toFixed(this.utils.num_decimals(precision));
    }

    
    // Floor a number to a given precision

    floor_num(num, precision) {
        return (Math.floor(num / precision) * precision).toFixed(this.utils.num_decimals(precision));
    }


    // Round a price to the supported market precision

    round_price(market, price) {
        return this.round_num(price, market.precision.price);
    }


    // Round an order amount to the supported market precision

    round_amount(market, amount) {
        return this.round_num(amount, market.precision.amount);
    }


    // Floor an order amount to the supported market precision

    floor_amount(market, amount) {
        return this.floor_num(amount, market.precision.amount);
    }

    // Get relative price

    get_relative_price(market, price, from = null) {
        var operator = String(price).substr(0,1);
        if (from == null) {
            from = (operator == '+' ? market.ask : market.bid);
        }
        var original_price = price;
        price = price.replace(operator, '');
        if (String(price).indexOf('%') > 0) {   // Price is a percentage
            price = price.replace('%','');
            var variance = from * (price / 100);
        } else {                                // Price is a float
            var variance = price;
        }
        variance = (String(operator) + String(variance)) * 1;
        var rel = (from * 1) + (variance * 1);
        var relative_price = this.round_price(market, rel);
        this.output.debug('convert_rel_price', [from, original_price, relative_price]);
        return relative_price;
    }
    
    // Get USD size of current position from exchange

    async position_size_usd(stub, symbol) {
        var filter = {symbol: symbol}
        var position = await this.exchange_execute(stub, 'position', filter);
        var size = !this.utils.is_empty(position) ? position['usd_size'] : 0;
        //console.log('Size: ' + size)
        return (!isNaN(size) ? size : 0);  
    }


    // Get current position for symbol

    async get_position(stub, symbol) {
        var filter = {symbol: symbol}
        var position = await this.exchange_execute(stub, 'position',filter);
        if (!this.utils.is_empty(position)) {
            //console.log(position)
            return position;
        }
        return false;  
    }


    // Get relative numbers operator (+ or -)

    get_operator(num) {
        return ['+','-'].includes(String(num).substr(0,1)) ? String(num).substr(0,1) : undefined;
    }


    // Apply operator to number

    apply_operator(num) {
        if (this.is_relative(num)) {
            var operator = this.get_operator(num)
            num = (operator == '+' ? 1 : -1) * parseFloat(num.replace(operator, ''))
            return num
        }
        return num
    }


    // Get market price

    async get_market_price(stub, symbol, side) {
        const market = await this.exchange_execute(stub, 'get_market_by_id_or_symbol', symbol);
        return (side == 'buy' ? market.ask : (side == 'sell' ? market.bid : market.avg));
    }

    
    // Convert base, quote or USD order size to order amount
    
    async get_amount(params, type = 'standard') {

        var [stub, market, symbol, side, size, base, quote, usd, price, stopsize, stopbase, stopquote, stopusd, stoptrigger, stopprice, profitsize, profitbase, profitquote, profitusd, profittrigger, profitprice] = this.utils.extract_props(params, ['stub', 'market', 'symbol', 'side', 'size', 'base', 'quote', 'usd', 'price', 'stopsize', 'stopbase', 'stopquote', 'stopusd', 'stoptrigger', 'stopprice', 'profitsize', 'profitbase', 'profitquote', 'profitusd', 'profittrigger', 'profitprice']);

        // Override sizing for stop loss and take profit orders
        switch(type) {
            case 'stoploss' :   size = (stopsize != undefined ? stopsize : size);
                                base = (stopbase != undefined ? stopbase : base);
                                quote = (stopquote != undefined ? stopquote : quote);
                                usd = (stopusd != undefined ? stopusd : usd);
                                price = (stopprice == undefined ? stoptrigger : stopprice);
                                break;
            case 'trailstop' :  size = (stopsize != undefined ? stopsize : size);
                                base = (stopbase != undefined ? stopbase : base);
                                quote = (stopquote != undefined ? stopquote : quote);
                                usd = (stopusd != undefined ? stopusd : usd);
                                price = (stopprice == undefined ? stoptrigger : stopprice);
                                break;
            case 'takeprofit' : size = (profitsize != undefined ? profitsize : size);
                                base = (profitbase != undefined ? profitbase : base);
                                quote = (profitquote != undefined ? profitquote : quote);
                                usd = (profitusd != undefined ? profitusd : usd);
                                price = (profitprice == undefined ? profittrigger : profitprice);
                                break;
        }

        // Default size when no size provided for stoploss and takeprofit
        if ((['stoploss', 'takeprofit', 'trailstop'].includes(type)) && (size == null) && (base == null) && (quote == null) && (usd == null)) {
            var order_sizing = await this.exchange_get(stub, 'order_sizing');
            var position = await this.get_position(stub, symbol);
            switch (order_sizing) {
                case 'base'  :   base  = position.base_size;   break;
                case 'quote' :   quote = position.quote_size;  break;
            }
        }

        // If size provided, assume it's the quote size
        if (size != undefined) quote = size;

        // Get market data for symbol
        if (market == undefined) {
            const market = await this.exchange_execute(stub, 'get_market_by_id_or_symbol',symbol);
        }

        // Base and quote prices
        var basesize  = (base  != undefined ? base  : null);
        var quotesize = (quote != undefined ? quote : null);

        // Get indicative market price and convert price if it is relative
        var market_price = await this.get_market_price(stub, symbol, side);
        if (price == undefined) price = market_price;
        if (this.is_relative(price)) {
            price = await this.get_relative_price(market, price);
        }

        // Size provided in USD
        if (base == undefined && quote == undefined && usd != undefined) {
            if (this.stablecoins.includes(market.quote)) {
                this.output.debug('convert_size_usd')
                quotesize = usd;
            } else {
                var conversion_pairs = Object.values(market.usd.pairs).filter(val => val !== null).join(', ');
                this.output.debug('convert_size_pair', conversion_pairs)
                if (market.hasOwnProperty('usd')) {
                    basesize  = usd / market.usd.base;
                    quotesize = usd / market.usd.quote;
                } else {
                    this.output.error('convert_size_usd')
                }
            }
        }

        // Amount based on Exchange's order sizing (base or quote)
        var amount = null;
        switch (this.order_sizing) {
            case  'base'    :   amount = (basesize != null ? basesize : quotesize / price);
                                this.output.debug('exchange_size_base', [market.base, amount])
                                break;
            case  'quote'   :   amount = (quotesize != null ? quotesize : basesize * price) / market.contract_size;
                                this.output.debug('exchange_size_quote', [market.quote, amount])
                                break;
        }

        if (Number.isNaN(amount)) {            
            this.output.error('order_size_nan', this.utils.serialize({sizing: this.order_sizing, base: basesize, quote: quotesize, price: price}));
            return false;
        }

        return market.type == 'spot' ? this.floor_amount(market, amount) : this.round_amount(market, amount);

    }

    
    // Get order parameters for layered pricing and sizing
    
    async order_params_advanced(type, params) {

        params = this.utils.lower_props(params);
        var [market, base, quote, usd, price, tag] = this.utils.extract_props(params, ['market', 'base', 'quote', 'usd', 'price', 'tag']);
        
        if (this.is_relative(price)) {
            var operator = this.get_operator(price);
            price = price.replace(operator, '');
        } else {
            var operator = undefined;
        }

        if (this.price_is_layered(price)) {
            var parts = String(price).replace('+','').replace('-','').split(',',3);
            if (parts.length == 2) {
                parts.push(5);          // Default quantity of orders in a layered order;
            }
            if (parts.length == 3) {
                var [val1, val2, qty] = parts;
            }
        } else {
            qty = 1;
            var val = price;
        }

        if (operator != undefined) {   // Convert relative prices into absolute prices
            if (qty == 1) {
                val = this.get_relative_price(market, operator + String(val));
            } else {
                val1 = this.get_relative_price(market, operator + String(val1));
                val2 = this.get_relative_price(market, operator + String(val2));
            }
        }

        if (qty == 1) {                 // Non-layered order
            var adv_params = params;
            adv_params.price = val;
            var order_params = await this.order_params_standard(type, adv_params);
            return order_params;
        } else {                        // Layered order
            var minprice = Math.min(val1, val2);
            var maxprice = Math.max(val1, val2);
            var variance = (maxprice - minprice) / (qty - 1);
            var order_params = [];
            for (var i = 0; i < qty; i++) {
                var adv_params   = params;
                adv_params.base  = (base != undefined ? base / qty : undefined);
                adv_params.quote = (quote != undefined ? quote / qty : undefined);
                adv_params.usd   = (usd != undefined ? usd / qty : undefined);
                adv_params.price = this.round_price(market, minprice + (variance * i));
                adv_params.tag   = tag != undefined ? tag + (qty > 1 ? '-' + (i + 1) : '') : undefined;
                adv_params['is_layered'] = true;
                var level_params = await this.order_params_standard(type, adv_params);
                order_params.push(level_params);
            }
            this.output.debug('convert_layered', [qty, minprice, maxprice])
            return order_params;        
        }

    }


    // Check if sizing is a factor

    is_factor(size) {
        return (['x', '%'].includes(String(size).slice(-1))) ? true : false;
    }


    // Get factored size (size provided in x or %)

    async get_factored_size(order_type, params) {
        var [stub, market, symbol, size] = this.utils.extract_props(params, ['stub', 'market', 'symbol', 'size']);
        var size = String(size).toLowerCase();
        var operator = this.get_operator(size);
        if (operator == undefined)
            operator = '';
        var factor_type = String(size).slice(-1);
        switch (factor_type) {
            case 'x' : var factor = size.replace('x','').replace(operator, ''); break;
            case '%' : var factor = size.replace('%','').replace(operator, '') / 100; break;
            default  : var factor = 1; break;
        }
        var position_size = await this.position_size_usd(stub, symbol);
        var balance_size = await this.exchange_execute(stub, 'available_equity_usd',symbol);
        if (order_type == 'close') {
            var base = Math.abs(position_size)
            operator = '';  // Ignore operator on close orders
            var basetype = 'position'
        } else {
            if (operator == '') {  // If sizing is relative, make it relative to position size, else make it a factor of equity size
                var base = Math.abs(balance_size)
                var basetype = 'balance'
            } else {
                var base = Math.abs(position_size)
                var basetype = 'position'
            }
        }
        var info = '$' + Math.floor(base) + ' ' + basetype + ' x ' + factor;
        var newsize = operator + String(this.round_num(base * factor, 0.05)); 
        this.output.debug('order_size_factor', [size, newsize, info])
        return newsize
    }


    // Get relative size
    
    get_relative_size(current, size) {
        var operator = this.get_operator(size);
        return current + ((operator == '+' ? 1 : -1) * size.replace(operator, ''));
    }

    
    // Get target position size
    
    async convert_size(type, params) {

        var [stub, market, symbol, size, base, quote, usd, scale, maxsize, is_layered] = this.utils.extract_props(params, ['stub', 'market', 'symbol', 'size', 'base', 'quote', 'usd', 'scale', 'maxsize', 'is_layered']);

        // Check market symbol
        if (market == null) {
            this.output.error('market_retrieve', symbol)
            return false
        }

        var position_size = await this.position_size_usd(stub, symbol);
        var balance_size = await this.exchange_execute(stub, 'available_equity_usd',symbol);
        this.output.debug('position_size', [Math.round(position_size * 100) / 100])
        this.output.debug('balance_avail', [Math.round(balance_size * 100) / 100])

        var side = null;
        var is_close = false;   // Report this order will result in position closure
        var is_flip = false;    // Report this order will result in position flip

        // This order is part of a layered set of orders
        if (is_layered == undefined) is_layered = false; 

        // Check for base and quote factored sizing
        if (this.is_factor(base) || this.is_factor(quote)) {
            this.output.translate('error','factor_only_size')
            return false;
        }

        // Check if no size was given for close order
        var closeall = false;
        if (type == 'close') {
            var size_provided = false
            if (base != undefined)  size_provided = true
            if (quote != undefined) size_provided = true
            if (size != undefined)  size_provided = true
            if (usd != undefined)   size_provided = true
            if (!size_provided) {
                size = '100%'
                target = 0
                closeall = true;
            }
        }

        // size=xxx is the same as usd=xxx
        if (size != undefined) {
            if (this.is_factor(size)) {
                usd = await this.get_factored_size(type, params)
            } else {
                usd = size
            }
            delete params.size
            size = undefined
        }

        // Determine what kind of sizing was supplied and get the amount
        var sizes = {
            base: base,
            quote: quote, 
            usd: usd,
        }
        for (const [sizing_type, value] of Object.entries(sizes)) {
            if (value != undefined) {
                var sizing = sizing_type
                var requested = value
                break;
            }
        }

        // Determine current position size
        var current_position = await this.get_position(stub, symbol)
        if (current_position !== false) {
            var dir = current_position.direction
            var current = (dir == 'long' ? 1 : -1) * parseFloat(current_position[sizing + '_size'])
        } else {
            var dir = 'flat'
            var current = 0; 
        }

        if (isNaN(current)) current = 0;
        var target = null

        // Convert relative size
        var order_is_relative = false
        if (this.is_relative(requested)) {
            if (['long', 'short'].includes(type)) {
                if (maxsize == undefined) {
                    var warn_limit = 5;
                    var require_maxsize = await this.settings.get('config','trade:require_maxsize',true);
                    var warn_maxsize = await this.settings.get('counter','trade:warn_maxsize',0);
                    if (!require_maxsize && warn_maxsize < 5) {
                        warn_maxsize++;
                        this.output.warning('maxsize_disabled',[warn_maxsize, warn_limit]);
                        await this.settings.set('counter','trade:warn_maxsize',warn_maxsize);
                    }
                    if (require_maxsize) {
                        return this.output.error('order_rel_req_max', type)
                    }
                }
                requested = (dir == 'short' ? -1 : 1) * (Math.abs(current) + this.apply_operator(requested))
                order_is_relative = true
            } else {
                return this.output.error('order_size_rel', type)
            }
        }

        // Convert scale parameter
        if (scale != undefined) {
            if (dir == 'flat') {
                return this.output.error('order_scale_nopos', symbol)
            }
            var current = (dir == 'long' ? 1 : -1) * parseFloat(current_position['usd_size'])
            scale = parseFloat(scale)
            sizing = 'usd'
            requested = current * parseFloat(scale);
        }        
        
        requested = parseFloat(requested)   // Ensure requested is a float

        switch (type) {
            case 'buy'   :  target = current + requested;         break;
            case 'sell'  :  target = current - requested;         break;
            case 'long'  :  target = requested;                   break;
            case 'short' :  target = -1 * Math.abs(requested);    break;
            case 'close' :  if (dir == 'flat') return this.output.error('position_none', symbol)
                            target = closeall ? 0 : ((dir == 'long') ? current - Math.abs(requested) : current + Math.abs(requested))
                            is_close = true
        }

        // Maxsize checks
        if (maxsize != undefined) {

            if (['short', 'sell'].includes(type)) {     // Make sure maxsize is negative for sell orders
                maxsize = -1 * Math.abs(maxsize)
            }

            // Check if long or short order would exceed maxsize
            if (order_is_relative && ((type == 'long' && target > maxsize) || (type == 'short' && target < maxsize))) {
                target = maxsize;
                var newsize = Math.abs(target) - Math.abs(current)
                if (newsize < 0)
                    return this.output.error('order_over_maxsize', requested)
                else
                    this.output.warning('order_over_maxsize', [requested, newsize])            
            }
            // Check if buy or sell order would exceed maxsize
            if ((type == 'buy' && target > maxsize) || (type == 'sell' && target < maxsize)) {
                target = maxsize;
                var newsize = Math.abs(target) - Math.abs(current)
                if (newsize < 0)
                    return this.output.error('order_over_maxsize', requested)
                else
                    this.output.warning('order_over_maxsize', [requested, newsize])            
            }
        }

        // Check if already long or short more than requested (non relative orders only)
        
        if (type != "close" && is_layered !== true && !order_is_relative && scale == undefined && ((type == 'long' && target < current) || (type == 'short' && target > current))) {
            return this.output.error('order_size_exceeds', type)  
        }

        // Check if long or short relative order would cause a flip and prevent it
        if (order_is_relative && ((type == 'long' && target < 0) || (type == 'short' && target > 0))) {
            this.output.warning('order_rel_close')
            is_close = true
            target = 0
        }

        // Check if close order would exceed current position size
        if (type == 'close' && ((target > 0 && current < 0) || (target < 0 && current > 0))) {
            this.output.debug('close_exceeds_pos', [requested, 0 - current])
            target = 0;
        }

        // Check for a position flip 
        if ((dir == 'long' && target < 0) || (dir == 'short' && target > 0)) {
            is_flip = true
            this.output.warning('order_will_flip', [dir, (dir == 'long' ? 'short' : 'long')])
        }

        // Ensure that when closing all of position and the exchange uses base sizing that the order size equals the current base size
        if ((type == 'close') && (closeall) && (await this.exchange_get(stub, 'order_sizing') == 'base')) {
            sizing = 'base'
            var dir = current_position.direction
            current = (dir == 'long' ? 1 : -1) * current_position['base_size']
            target = 0
        }

        // Ensure that when closing all of position and the exchange uses quote sizing that the order size equals the current quote size
        if ((type == 'close') && (closeall) && (await this.exchange_get(stub, 'order_sizing') == 'quote')) {
            sizing = 'quote'
            var dir = current_position.direction
            current = (dir == 'long' ? 1 : -1) * current_position['quote_size']
            target = 0
        }

        if (isNaN(current)) current = 0;

        var order_size = target - current
        var order_side = (order_size >= 0 ? 'buy' : 'sell')
        var order_size = Math.abs(order_size)

        var currencies = {
            base:  market.base,
            quote: market.quote,
            usd:   'USD',
        }
        var currency = currencies[sizing];

        if (!is_layered) {
            this.output.debug('order_sizing_type', [currency, (sizing == 'usd' ? 'USD' : sizing)])
            this.output.notice('order_sizing_cur', [ (sizing == 'usd' ? 'USD' : sizing), currency, current])
            this.output.notice('order_sizing_tar', [ (sizing == 'usd' ? 'USD' : sizing), currency, target])
            this.output.notice('order_sizing_ord', [this.utils.uc_first(order_side), currency, order_size])
        }
        
        // Return result
        return [sizing, order_size, order_side, {is_close : is_close, is_flip: is_flip, is_layered: is_layered}];
        
    }

    // Check if the maximum amount of allowable positions is configured and if it has been met

    async check_maxposqty(stub, symbol) {
        var maxposqty = await this.config.get(stub + ':maxposqty');
        var symbols = [];
        if ((maxposqty != null) && (maxposqty != '') && (maxposqty > 0)) {
            var positions = await this.exchange_execute(stub, 'positions');
            if (!Array.isArray(positions)) {
                this.output.debug('custom_object',['Unexpected output for positions in check_maxposqty', positions]);
                positions = [];
            }
            var symbols = [];
            positions.forEach(position => {
                symbols.push(position.symbol);
            })
            if (!symbols.includes(symbol)) {
                symbols.push(symbol);
            }
            if (symbols.length > maxposqty) {
                this.output.error('position_maxposqty', [stub, positions.length]);
                return false;
            } else {
                return true;
            }
        }
        return true;
    }

    // Check if the maximum amount of allowable positions is configured and if it has been met

    async check_ignored(stub, symbol) {
        var ignored = await this.config.get([stub,symbol,'ignored'].join(':'), false);
        if (ignored) {
            this.output.error('position_ignoresym', [symbol, stub]);
            return false;
        }
        return true;
    }



    // Generate order parameters for standard orders (market, limit)
    
    async order_params_standard(type, params) {

        // Cancel open orders if requested
        if (params.hasOwnProperty('cancelall') && String(params.cancelall) == 'true') {
            await this.cancelall(params);
            delete params.cancelall;
        }

        // Check if close order with no position
        if (type == 'close') {
            var position = await this.get_position(params.stub, params.symbol);
            if (position == false) {
                return this.output.error('position_none', [params.symbol]);
            }
        }

        // Calculate order sizing and direction (side)
        let order_sizes = await this.convert_size(type, params);
        
        if (order_sizes === false)
            return this.output.error('order_size_unknown');
        
        var [sizing, size, side, flags] = order_sizes;
        params[sizing] = size;
        params.side = side;

        if (sizing == 'usd')
            delete params.size

        // Extract params
        params = this.utils.lower_props(params);
        var [stub, symbol, side, price, post, ioc, reduce, tag] = this.utils.extract_props(params, ['stub', 'symbol', 'side', 'price', 'post', 'ioc', 'reduce', 'tag']);
        
        // Get parameters from the normalizer
        this.param_map = await this.exchange_get(stub, 'param_map');
        this.order_sizing = await this.exchange_get(stub, 'order_sizing');
        this.stablecoins = await this.exchange_get(stub, 'stablecoins');

        //Check if an order is an advanced order (layered orders, relative pricing, etc)
        if (this.order_is_advanced(price)) {
            if (['long','short'].includes(type)) {
                type = side;
            }
            var level_params = await this.order_params_advanced(type, params);
            //if (this.utils.is_array(level_params) && level_params.length > 1)
            //    params['is_layered'] = true;
            return level_params;
        }

        // Get market info

        const market = await this.exchange_execute(stub, 'get_market_by_id_or_symbol',symbol);

        // Base order params object

        var amount = await this.get_amount(params, type);

        if (Math.abs(amount) < (market.precision.amount * 1)) {
            return this.output.error('order_too_small')
        }

        var order_params = {
            symbol  :   symbol.toUpperCase(),
            type    :   this.param_map[(price == undefined ? 'market' : 'limit')],
            side    :   side,
            amount  :   amount,
            price   :   (price != undefined ? price : null),
            params  :   {}
        }
        
        // Add additional parameters
        order_params.params[this.param_map.post]   = (String(post)   == "true" ? true : undefined);
        order_params.params[this.param_map.ioc]    = (String(ioc)    == "true" ? true : undefined);
        order_params.params[this.param_map.tag]    = tag;

        if (type == 'close') {
            order_params.params[this.param_map.reduce] = (String(reduce) == "true" ? true : undefined);
        }

        var custom_params = {
            tag         :   tag
        }

        // Get normalizer custom params (if defined)
        order_params = await this.exchange_execute(stub, 'custom_params',[type, order_params, custom_params]);

        return this.utils.remove_values(order_params, [null, undefined]);

    }

    // Layered order params conditional

    async layered_order_params_conditional(type, params) {
        params = this.utils.lower_props(params);
        
        var [market, profitbase, profitquote, profitusd, profittrigger, profittag] = this.utils.extract_props(params, ['market', 'profitbase', 'profitquote', 'profitusd','profittrigger', 'profittag']);

        if (this.is_relative(profittrigger)) {
            var operator = this.get_operator(profittrigger);
            profittrigger = profittrigger.replace(operator, '');
        } else {
            var operator = undefined;
        }

        var parts = String(profittrigger).replace('+','').replace('-','').split(',',3);
        if (parts.length == 2) {
            parts.push(5);          // Default quantity of orders in a layered order;
        }
        var [val1, val2, qty] = parts;

        if (operator != undefined) {   // Convert relative prices into absolute prices
            val1 = this.get_relative_price(market, operator + String(val1));
            val2 = this.get_relative_price(market, operator + String(val2));
        }

        var order_params = [];
        var minprice = Math.min(val1, val2);
        var maxprice = Math.max(val1, val2);
        var variance = (maxprice - minprice) / (qty - 1);
        for (var i = 0; i < qty; i++) {
            var adv_params   = params;
            adv_params.profitbase  = (profitbase != undefined ? profitbase / qty : undefined);
            adv_params.profitquote = (profitquote != undefined ? profitquote / qty : undefined);
            adv_params.profitusd   = (profitusd != undefined ? profitusd / qty : undefined);
            adv_params.profittrigger = this.round_price(market, minprice + (variance * i));
            // adv_params.profitprice = this.round_price(market, minprice + (variance * i));
            adv_params.profittag   = profittag != undefined ? profittag + (qty > 1 ? '-' + (i + 1) : '') : undefined;
            adv_params['is_layered'] = true;
            var level_params = await this.order_params_conditional(type, adv_params);
            order_params.push(level_params);
        }
        return order_params;
    }

    
    // Generate paramaters for conditional orders (stop loss or take profit)
    
    async order_params_conditional(type, params) {

        params = this.utils.lower_props(params);

        switch (type) {
            case 'stoploss' :   var [stub, symbol, side, trigger, triggertype, price, reduce, tag] = this.utils.extract_props(params, ['stub', 'symbol', 'side', 'stoptrigger', 'triggertype', 'stopprice', 'reduce', 'tag']);
                                var above = 'buy';
                                var below = 'sell';
                                //side = undefined;
                                break;
            case 'trailstop' :  var [stub, symbol, side, trigger, reduce, tag] = this.utils.extract_props(params, ['stub', 'symbol', 'side', 'trailstop', 'reduce', 'tag']);
                                var above = 'buy';
                                var below = 'sell';
                                side = undefined;
                                break;
            case 'takeprofit' : var [stub, symbol, side, trigger, triggertype, price, reduce, tag] = this.utils.extract_props(params, ['stub', 'symbol', 'side', 'profittrigger', 'triggertype', 'profitprice', 'reduce', 'tag']);
                                var above = 'sell';
                                var below = 'buy';
                                //side = undefined;
                                break;
        }
        
        if (this.price_is_layered(trigger)) {
            var tp_level = this.layered_order_params_conditional(type, params);
            return tp_level;
        }
        
        // If takeprofit and profitsize is percentage, calculate size
        if (type == 'takeprofit' && String(params.profitsize).indexOf('%') !== -1) {
            var percentage = String(params.profitsize).split('%').join('') / 100;
            delete params.profitsize;
            var position = await this.get_position(stub, symbol);
            var tpsize = false;
            var order_sizing = false;
            if (position !== false) {
                order_sizing = 'base';
                tpsize = position.base_size;
            } else {
                if ((params.totalsize != undefined) && (params.order_sizing != undefined)) {
                    order_sizing = params.order_sizing;
                    tpsize = params.totalsize;
                    delete params.totalsize;
                    delete params.order_sizing;
                }
            }
            if ((tpsize !== false) && (order_sizing !== false)) {
                delete params.usd;
                delete params.base;
                delete params.quote;
                params['profit' + order_sizing] = tpsize * percentage;
            }
        }

        this.param_map = await this.exchange_get(stub, 'param_map');
        this.order_sizing = await this.exchange_get(stub, 'order_sizing');
        this.stablecoins = await this.exchange_get(stub, 'stablecoins');

        // Get market info
        const market = await this.exchange_execute(stub, 'get_market_by_id_or_symbol',symbol);

        //Check if stoptrigger or stopprice is relative and convert if necessary
        if (this.is_relative(trigger) && ['stoploss', 'takeprofit'].includes(type)) {
            trigger = this.get_relative_price(market, trigger);
        }
        if ((price != undefined) && (this.is_relative(price))) {
            price = this.get_relative_price(market, price);
        }

        // Convert percentage price to value for trailstop
        if ((type == 'trailstop')  && (trigger.indexOf('%') != -1)) {
            var position = await this.get_position(stub, symbol);
            if (position !== false) {
                var side = position.direction == "long" ? "sell" : "buy"
                var operator = side == "buy" ? "+" : "-";
            }
            trigger = (operator + this.round_price(market, Math.abs(market.avg * (trigger.replace('%','') / 100)))) * 1;
        }

        // If side is undefined, assume side based on trigger above or below market price
        if (side == undefined) {
            var market_price = await this.get_market_price(stub, symbol);
            side = (trigger > market_price ? above : (trigger < market_price ? below : null));
            if (side == null) {
                return this.output.error('order_side_unknown');
            } else {
                this.output.debug('order_side_assumed', side);
            }
        }

        // Base order params object

        var amount = await this.get_amount(params, type);

        if (Math.abs(amount) < (market.precision.amount * 1)) {
            return this.output.error('order_too_small')
        }

        // Base order params object
        var order_params = {
            symbol  :   symbol.toUpperCase(),
            type    :   this.param_map[(type == 'trailstop' ? 'trailstop' : (price == undefined ? type + '_market' : type + '_limit'))],
            side    :   side.toLowerCase(),
            amount  :   amount,
            price   :   (price != undefined ? price : null),
            params  :   {}
        }
     
        // Add additional parameters
        var reduce_only = (String(reduce) == "true" || reduce == true ? true : false);
        order_params.params[this.param_map.reduce] = reduce_only;
        
        // Trigger for TP/SL
        if (this.param_map.hasOwnProperty(type + '_trigger')) {
            order_params.params[this.param_map[type + '_trigger']] = trigger;
        } else {
            order_params.params[this.param_map.trigger] = trigger;
        }
        //if ((order_params.type == 'STOP_LOSS_LIMIT') && (order_params.price == null)) {
        //    order_params.price = (trigger * 1)+1
        //}
        if (order_params.params.hasOwnProperty('price')) {
            order_params.price = order_params.params.price;
            delete order_params.params.price
        }

        // Trigger type for TP/SL
        if (this.param_map.hasOwnProperty('trigger_type')) {
            order_params.params[this.param_map.trigger_type] = triggertype == undefined ? 'mark_price' : triggertype;
        }

        //order_params.params[this.param_map.tag]    = tag;

        var custom_params = {
            tag         :   tag,
            trigger     :   trigger,
            price       :   (price != undefined ? price : null),
            triggertype :   triggertype == undefined ? 'mark' : triggertype,
            reduce      :   reduce_only,
        }
        
        // Get normalizer custom params (if defined)
        order_params = await this.exchange_execute(stub, 'custom_params',[type, order_params, custom_params])

        return this.utils.remove_values(order_params, [null, undefined]);

    }

    // Add default stoploss and/or take profit to order if none provided and a default exists (pair-level take precendence over stub-level)

    async add_order_defaults(type, params) {
        if (params.symbol != undefined && params.stub != undefined && params.size == undefined && params.base == undefined && params.quote == undefined && params.usd == undefined && params.scale == undefined) {
            var stub = params.stub;
            var symbol = params.symbol;
            var defsizestub = await this.config.get(stub + ':defsize');
            var defsizesymbol = await this.config.get(stub + ':' + symbol + ':defsize');
            if (defsizesymbol !== false) {
                this.output.debug('order_size_default', [(stub + ':' + symbol + ':defsize').toLowerCase()]);
                params.size = defsizesymbol;
            } else {
                if (defsizestub !== false) {
                    this.output.debug('order_size_default', [(stub + ':defsize').toLowerCase()]);
                    params.size = defsizestub;
                }
            }
        } 
        /*
        if (['long','short'].includes(type) && params.symbol != undefined && params.stub != undefined && params.stoptrigger == undefined) {
            var stub = params.stub;
            var symbol = params.symbol;
            var operator = (type == 'long' ? '-' : '+');
            var defstoptriggerstub = await this.config.get(stub + ':defstoptrigger');
            var defstoptriggersymbol = await this.config.get(stub + ':' + symbol + ':defstoptrigger');
            if (defstoptriggersymbol !== false) {
                this.output.debug('order_sl_default', [(stub + ':' + symbol + ':defstoptrigger').toLowerCase()]);
                params.stoptrigger = operator + defstoptriggersymbol;
                params.reduce = true;
            } else {
                if (defstoptriggerstub !== false) {
                    this.output.debug('order_sl_default', [(stub + ':defstoptrigger').toLowerCase()]);
                    params.stoptrigger = operator + defstoptriggerstub;
                    params.reduce = true;
                }
            }
        } 
        if (['long','short'].includes(type) && params.symbol != undefined && params.stub != undefined && params.profittrigger == undefined) {
            var stub = params.stub;
            var symbol = params.symbol;
            var operator = (type == 'long' ? '+' : '-');
            var defprofittriggerstub = await this.config.get(stub + ':defprofittrigger');
            var defprofittriggersymbol = await this.config.get(stub + ':' + symbol + ':defprofittrigger');
            if (defprofittriggersymbol !== false) {
                this.output.debug('order_tp_default', [(stub + ':' + symbol + ':defprofittrigger').toLowerCase()]);
                params.profittrigger = operator + defprofittriggersymbol;
                params.reduce = true;
            } else {
                if (defprofittriggerstub !== false) {
                    this.output.debug('order_tp_default', [(stub + ':defprofittrigger').toLowerCase()]);
                    params.profittrigger = operator + defprofittriggerstub;
                    params.reduce = true;
                }
            }
        } 
        if (['long','short'].includes(type) && params.symbol != undefined && params.stub != undefined && params.profittrigger != undefined) {
            var stub = params.stub;
            var symbol = params.symbol;
            var defprofitsizestub = await this.config.get(stub + ':defprofitsize');
            var defprofitsizesymbol = await this.config.get(stub + ':' + symbol + ':defprofitsize');
            if (defprofitsizesymbol !== false) {
                this.output.debug('order_tpsize_default', [(stub + ':' + symbol + ':defprofitsize').toLowerCase()]);
                params.profitsize = defprofitsizesymbol;
            } else {
                if (defprofitsizestub !== false) {
                    this.output.debug('order_tpsize_default', [(stub + ':defprofitsize').toLowerCase()]);
                    params.profitsize = defprofitsizestub;
                }
            }
        } 
        */
        return params;
    }

    // Get total size of orders

    total_order_size(orders) {
        if (!this.utils.is_array(orders)) 
            orders = [orders];
        var total = 0;
        for(var i = 0; i < orders.length; i++) {
            total += (orders[i].amount * 1);
        }
        return total;
    }

    // Parse params and create an order

    async create_order(type, params) {
        const stub = params.stub
        const symbol = params.symbol
        params.market = await this.exchange_execute(stub, 'get_market_by_id_or_symbol',symbol.toUpperCase());
        this.output.subsection('order_' + type);  
        var order_params = null;
        if (['long', 'short', 'buy', 'sell'].includes(type)) {
            if (!await this.check_maxposqty(stub, symbol)) {
                return false;
            }
            if (!await this.check_ignored(stub, symbol)) {
                return false;
            }
        }
        switch (type) {
            case 'long'        : order_params = await this.order_params_standard('long', params);
                                 break;
            case 'short'       : order_params = await this.order_params_standard('short', params);
                                 break;
            case 'buy'         : order_params = await this.order_params_standard('buy', params);
                                 break;
            case 'sell'        : order_params = await this.order_params_standard('sell', params);
                                 break;
            case 'close'       : order_params = await this.order_params_standard('close', params);
                                 break;
            case 'stoploss'    : order_params = await this.order_params_conditional('stoploss', params);
                                 break;
            case 'takeprofit'  : order_params = await this.order_params_conditional('takeprofit', params);
                                 break;
            case 'trailstop'   : order_params = await this.order_params_conditional('trailstop', params);
                                 break;
        } 
        
        if (order_params !== false)
            this.queue.add(stub, symbol, order_params);
        
        if (['long', 'buy'].includes(type))
            await this.tpsl(params, 'sell', true);
        if (['short', 'sell'].includes(type))
            await this.tpsl(params, 'buy', true);
        
    }
    
    
    // Clear order queue, create orders, and process the queue (submit orders to the exchange)

    async create_and_submit_order(type, params) {
        const stub = params.stub
        const symbol = params.symbol
        
        // Disable reduce=true for FTX spot markets
        if (String(params.reduce) == 'true') {
            var exch = await this.accounts.get_shortname_from_stub(params.stub);
            if (exch.indexOf('ftx') != -1) { 
                var market = await this.exchange_execute(stub, 'get_market_by_id_or_symbol',symbol.toUpperCase());
                if ((market.type == 'spot') && (params.hasOwnProperty('reduce'))) {
                    delete params.reduce;
                }
            }
        }

        this.queue.clear(stub, symbol)
        await this.create_order(type, params);
        return await this.queue.process(stub, symbol);;
    }


    // ------------------------------------------------------------------------------------------- //
    //                        The methods below are exposed to the API                             //
    // ------------------------------------------------------------------------------------------- //

    // Long Order

    async long(params) {            

        if (params.stub !== undefined && params.symbol != undefined) {
            if (!await this.check_ignored(params.stub, params.symbol)) {
                return false;
            }
        }

        params = await this.add_order_defaults('long', params);

        var schema = {
            stub:   { required: 'string', format: 'lowercase', },
            symbol: { required: 'string', format: 'uppercase', },
            size:   { requiredifnotpresent: ['base', 'quote', 'usd', 'scale'],  },
            base:   { requiredifnotpresent: ['size', 'quote', 'usd', 'scale'],  },
            quote:  { requiredifnotpresent: ['base', 'size', 'usd', 'scale'],   },
            usd:    { requiredifnotpresent: ['base', 'quote', 'size', 'scale'], },
            scale:  { requiredifnotpresent: ['base', 'quote', 'size', 'usd'], },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        return await this.create_and_submit_order('long', params);
    }

    // Short Order

    async short(params) {

        if (params.stub !== undefined && params.symbol != undefined) {
            if (!await this.check_ignored(params.stub, params.symbol)) {
                return false;
            }
        }

        params = await this.add_order_defaults('short', params);

        var schema = {
            stub:   { required: 'string', format: 'lowercase', },
            symbol: { required: 'string', format: 'uppercase', },
            size:   { requiredifnotpresent: ['base', 'quote', 'usd', 'scale'],  },
            base:   { requiredifnotpresent: ['size', 'quote', 'usd', 'scale'],  },
            quote:  { requiredifnotpresent: ['base', 'size', 'usd', 'scale'],   },
            usd:    { requiredifnotpresent: ['base', 'quote', 'size', 'scale'], },
            scale:  { requiredifnotpresent: ['base', 'quote', 'size', 'usd'], },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        return await this.create_and_submit_order('short', params);
    }


    // Buy Order

    async buy(params) {

        if (params.stub !== undefined && params.symbol != undefined) {
            if (!await this.check_ignored(params.stub, params.symbol)) {
                return false;
            }
        }

        params = await this.add_order_defaults('buy', params);

        var schema = {
            stub:   { required: 'string', format: 'lowercase', },
            symbol: { required: 'string', format: 'uppercase', },
            size:   { requiredifnotpresent: ['base', 'quote', 'usd', 'scale'],  },
            base:   { requiredifnotpresent: ['size', 'quote', 'usd', 'scale'],  },
            quote:  { requiredifnotpresent: ['base', 'size', 'usd', 'scale'],   },
            usd:    { requiredifnotpresent: ['base', 'quote', 'size', 'scale'], },
            scale:  { requiredifnotpresent: ['base', 'quote', 'size', 'usd'], },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        return await this.create_and_submit_order('buy', params);
    }


    // Sell Order

    async sell(params) {

        if (params.stub !== undefined && params.symbol != undefined) {
            if (!await this.check_ignored(params.stub, params.symbol)) {
                return false;
            }
        }

        params = await this.add_order_defaults('sell', params);

        var schema = {
            stub:   { required: 'string', format: 'lowercase', },
            symbol: { required: 'string', format: 'uppercase', },
            size:   { requiredifnotpresent: ['base', 'quote', 'usd', 'scale'],  },
            base:   { requiredifnotpresent: ['size', 'quote', 'usd', 'scale'],  },
            quote:  { requiredifnotpresent: ['base', 'size', 'usd', 'scale'],   },
            usd:    { requiredifnotpresent: ['base', 'quote', 'size', 'scale'], },
            scale:  { requiredifnotpresent: ['base', 'quote', 'size', 'usd'], },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        return await this.create_and_submit_order('sell', params);
    }


    // Potential Position (current position + pending limit orders + queue)

    async potential_position(stub, symbol, side = false) {
        if (side == null) side = false;
        var dirmap = {
            'buy'   : 'buy',
            'sell'  : 'sell',
            'long'  : 'buy',
            'short' : 'sell'
        }
        var market = await this.exchange_execute(stub, 'market', {symbol: symbol});
        var order_sizing = await this.exchange_get(stub, 'order_sizing');
        var param_map = await this.exchange_get(stub, 'param_map');
        var levels = [];
        // Get current position
        var position = await this.get_position(stub, symbol);
        if (![false, undefined].includes(position)) {    // Currently in a position
            if (!side && position.direction !== false) side = dirmap[position.direction.toLowerCase()];
            levels.push({
                price: position.entry_price,
                base: position.base_size,
                quote: position.quote_size,
                amount: order_sizing == 'base' ? position.base_size : position.quote_size,
                side: dirmap[position.direction.toLowerCase()],
                type: 'position'
            });
        }
        // Get pending limit orders and add to possible average position entry price
        var orders = await this.exchange_execute(stub, 'orders', {status: 'open', symbol: symbol, type: 'limit'}, true);
        for (var i = 0; i < orders.length; i++) {
            var order = orders[i];
            if (!side && order.direction !== false)  side = dirmap[order.side.toLowerCase()];
            levels.push({
                price: order.price,
                base: order.size_base,
                quote: order.size_quote,
                amount: order_sizing == 'base' ? order.size_base : order.size_quote,
                side: dirmap[order.side.toLowerCase()],
                type: 'orders'
            });
        };
        // Get pending orders in the order queue
        var queue = this.queue.get(stub, symbol);
        for (var i = 0; i < queue.length; i++) {
            var item = queue[i];
            if (!side && item.side !== false)  side = dirmap[item.side.toLowerCase()];
            if ([param_map['limit'], param_map['market']].includes(item.type) && item.side == side) {
                var price = (item.price != null ? item.price : market.avg); 
                levels.push({
                    price: price,
                    base: order_sizing == 'base' ? item.amount : item.amount / price,
                    quote: order_sizing == 'quote' ? item.amount : item.amount * price,
                    amount: item.amount,
                    side: item.side,
                    type: 'queue'
                })
            }
        }
        var totalbase = 0;
        var totalquote = 0;
        var totalval = 0;
        var typetotals = {
            position: 0,
            orders: 0,
            queue: 0,
        }
        for (var i = 0; i < levels.length; i++) {
            var level = levels[i];
            totalbase += (level.base * 1);
            totalquote += (level.quote * 1);
            totalval += ((level.base * level.price) * 1);
            typetotals[level.type] += (level.amount * 1);
        }
        var avgprice = totalval / totalbase;
        var amount = order_sizing == 'base' ? totalbase : totalquote;
        var side = dirmap[side];
        if (amount > 0) {
            this.output.debug('potential_position', [ {price: avgprice, base: totalbase, quote: totalquote, sizing: order_sizing, side: side, amount: amount, totals: this.utils.serialize({position: typetotals.position, orders: typetotals.orders, queue: typetotals.queue})} ]);
            return { base: totalbase, quote: totalquote, sizing: order_sizing, amount: amount, price: avgprice, side: side}
        }
        return false;
    }

    // Stoploss Order

    async stoploss(params, side = null, nosubmit = false) {
        if (params.stub !== undefined && params.symbol != undefined) {
            if (!await this.check_ignored(params.stub, params.symbol)) {
                return false;
            }
        }

        var schema = {
            stub:          { required: 'string', format: 'lowercase', },
            symbol:        { required: 'string', format: 'uppercase', },
            stoptrigger:   { optional: 'string',  },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 


        var stub = params.stub;
        var symbol = params.symbol;
        var cancelall = params.cancelall != undefined ? Boolean(params.cancelall) : false;

        // If stoptrigger not given, check if default exists and use that
        if ((params.stoptrigger == undefined)) {
            var operator = (side != null ? (side == 'sell' ? '-' : '+') : '');
            var defstoptriggerstub = await this.config.get(stub + ':defstoptrigger');
            var defstoptriggersymbol = await this.config.get(stub + ':' + symbol + ':defstoptrigger');
            if (defstoptriggersymbol !== false) {
                this.output.debug('order_sl_default', [(stub + ':' + symbol + ':defstoptrigger').toLowerCase() + '=' + defstoptriggersymbol]);
                params.stoptrigger = defstoptriggersymbol;
            } else {
                if (defstoptriggerstub !== false) {
                    this.output.debug('order_sl_default', [(stub + ':defstoptrigger').toLowerCase() + '=' + defstoptriggerstub]);
                    params.stoptrigger = defstoptriggerstub;
                }
            }
        }

        if (params.stoptrigger != undefined) {

            // Check if currently in a position and if stoptrigger is relative and make it relative to the position entry price
            var market = await this.exchange_execute(stub, 'market', {symbol: symbol});
            var param_map = await this.exchange_get(stub, 'param_map');
            if (this.is_relative(params.stoptrigger)) {
                var operator = String(params.stoptrigger).substr(0,1);
                if (side == null) {
                    side = (operator == '-' ? 'sell' : 'buy');
                }
            } else {
                if (side == null) {
                    side = (params.stoptrigger < market.bid ? 'sell' : params.stoptrigger > market.ask ? 'buy' : null);
                }
            }
            var potential = await this.potential_position(stub, symbol, (side == null ? null : (side == 'buy' ? 'sell' : 'buy')));
            if (side == null && potential.side != null) {
                side = (potential.side == 'buy' ? 'sell' : 'buy');
            }
            if ((params.stoptrigger.indexOf('%') != -1) && (!this.is_relative(params.stoptrigger))) {
                var operator = side == 'sell' ? '-' : '+';
                params.stoptrigger =  operator + params.stoptrigger;
            }
            if (potential != false) {
                if (this.is_relative(params.stoptrigger)) {
                    if (isNaN(potential.price)) {
                        var price = (parseFloat(market.bid) + parseFloat(market.ask)) / 2;
                        //if (isNaN(price)) {
                        //    this.output.debug('custom_object', ['Cannot find potential or market price, dumping market data:', market]);
                        //    this.output.debug(market);
                        //} else {
                        //    this.output.debug('custom_object', ['Potential price cannot be calculated, using market price: ', price]);
                        //}
                    } else {
                        var price = potential.price;
                        //this.output.debug('custom_object', ['Potential price calculated, using potential price: ', price]);
                    }
                    params.stoptrigger = this.get_relative_price(market, params.stoptrigger, this.round_price(market, price));
                }
                params['stop' + potential.sizing] = potential.amount;
                // Cancel existing SL orders
                if (cancelall === true) {
                    await this.exchange_execute(stub, 'cancel_all', {symbol: symbol, type: 'stop_limit'});
                    await this.exchange_execute(stub, 'cancel_all', {symbol: symbol, type: 'stop_market'});
                }
                // Create new SL order
                params['reduce'] = params.reduce == undefined ? "true" : params.reduce;
                params['side'] = side;
                if (nosubmit)
                    return await this.create_order('stoploss', params);
                else 
                    return await this.create_and_submit_order('stoploss', params);
            } else {
                // Cancel existing SL orders
                if (cancelall === true) {
                    await this.exchange_execute(stub, 'cancel_all', {symbol: symbol, type: 'stop_limit'});
                    await this.exchange_execute(stub, 'cancel_all', {symbol: symbol, type: 'stop_market'});
                }
                this.output.notice('position_nopotential',[symbol]);
                return false;
            }
        } else {
            return false;
        }       
        
    }


    // Takeprofit Order

    async takeprofit(params, side = null, nosubmit = false) {

        if (params.stub !== undefined && params.symbol != undefined) {
            if (!await this.check_ignored(params.stub, params.symbol)) {
                return false;
            }
        }

        var schema = {
            stub:          { required: 'string', format: 'lowercase', },
            symbol:        { required: 'string', format: 'uppercase', },
            profittrigger: { optional: 'string',  },
            profitsize:    { optional: 'string',  },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 


        var stub = params.stub;
        var symbol = params.symbol;

        // If profitsize not given, check if default exists and use that, else use 100%
        if (params.profitsize == undefined) {
            var defprofitsizestub = await this.config.get(stub + ':defprofitsize');
            var defprofitsizesymbol = await this.config.get(stub + ':' + symbol + ':defprofitsize');
            if (defprofitsizesymbol !== false) {
                this.output.debug('order_tpsize_default', [(stub + ':' + symbol + ':defprofitsize').toLowerCase() + '=' + defprofitsizesymbol]);
                params.profitsize = defprofitsizesymbol;
            } else {
                if (defprofitsizestub !== false) {
                    this.output.debug('order_tpsize_default', [(stub + ':defprofitsize').toLowerCase() + '=' + defprofitsizestub]);
                    params.profitsize = defprofitsizestub;
                } else {
                    this.output.debug('order_tpsize_default', ['default=100%']);
                    params.profitsize = '100%';
                }
            }
        }

        // If profittrigger not given, check if default exists and use that
        if ((params.profittrigger == undefined)) {
            var operator = side == 'sell' ? '+' : '-';
            var defprofittriggerstub = await this.config.get(stub + ':defprofittrigger');
            var defprofittriggersymbol = await this.config.get(stub + ':' + symbol + ':defprofittrigger');
            if (defprofittriggersymbol !== false) {
                this.output.debug('order_tp_default', [(stub + ':' + symbol + ':defprofittrigger').toLowerCase() + '=' + defprofittriggersymbol]);
                params.profittrigger = operator + defprofittriggersymbol;
            } else {
                if (defprofittriggerstub !== false) {
                    this.output.debug('order_tp_default', [(stub + ':defprofittrigger').toLowerCase() + '=' + defprofittriggerstub]);
                    params.profittrigger = operator + defprofittriggerstub;
                }
            }
        }

        if (params.profittrigger != undefined) {

            // Check if currently in a position and if profittrigger is relative and make it relative to the position entry price
            var market = await this.exchange_execute(stub, 'market', {symbol: symbol});
            if ((this.is_relative(params.profittrigger)) && (!this.price_is_layered(params.profittrigger))) {
                var operator = String(params.profittrigger).substr(0,1);
                if (side == null) {
                    side = (operator == '+' ? 'sell' : 'buy');
                }
            } else {
                if (side == null) {
                    side = (params.profittrigger < market.bid ? 'buy' : params.profittrigger > market.ask ? 'sell' : null);
                }
            }
            var potential = await this.potential_position(stub, symbol, (side == null ? null : (side == 'buy' ? 'sell' : 'buy')));
            if (side == null && potential.side != null) {
                side = (potential.side == 'buy' ? 'sell' : 'buy');
            }
            if ((params.profittrigger.indexOf('%') != -1) && (!this.is_relative(params.profittrigger))) {
                var operator = side == 'sell' ? '+' : '-';
                params.profittrigger =  operator + params.profittrigger;
            }
            if (potential != false) {
                if (this.is_relative(params.profittrigger) && (!this.price_is_layered(params.profittrigger))) {
                    if (isNaN(potential.price)) {
                        var price = (parseFloat(market.bid) + parseFloat(market.ask)) / 2;
                        //if (isNaN(price)) {
                        //    this.output.debug('custom_object', ['Cannot find potential or market price, dumping market data:', market]);
                        //    this.output.debug(market);
                        //} else {
                        //    this.output.debug('custom_object', ['Potential price cannot be calculated, using market price: ', price]);
                        //}
                    } else {
                        var price = potential.price;
                        //this.output.debug('custom_object', ['Potential price calculated, using potential price: ', price]);
                    }
                    params.profittrigger = this.get_relative_price(market, params.profittrigger, this.round_price(market, price));
                }
                params['profit' + potential.sizing] = (params.profitsize.indexOf('%') != '' ? potential.amount * ((params.profitsize.replace('%','') * 1) / 100) : potential.amount);
                // Cancel existing TP orders
                if (params.cancelall != undefined && String(params.cancelall) == 'true') {
                    await this.exchange_execute(stub, 'cancel_all', {symbol: symbol, type: 'takeprofit_limit'});
                    await this.exchange_execute(stub, 'cancel_all', {symbol: symbol, type: 'takeprofit_market'});
                    await this.exchange_execute(stub, 'cancel_all', {symbol: symbol, type: 'limit', side: side});
                }
                // Create new TP order
                params['reduce'] = params.reduce == undefined ? "true" : params.reduce;
                params['side'] = side;
                if (nosubmit)
                    return await this.create_order('takeprofit', params);
                else 
                    return await this.create_and_submit_order('takeprofit', params);
            } else {
                // Cancel existing TP orders
                if (params.cancelall != undefined && String(params.cancelall) == 'true') {
                    await this.exchange_execute(stub, 'cancel_all', {symbol: symbol, type: 'takeprofit_limit'});
                    await this.exchange_execute(stub, 'cancel_all', {symbol: symbol, type: 'takeprofit_market'});
                    await this.exchange_execute(stub, 'cancel_all', {symbol: symbol, type: 'limit', side: side});
                }
                this.output.notice('position_nopotential',[symbol]);
                return false;
            }
        } else {
            return false;
        }       
        
    }


    // Crate Take Profit and Stoploss Orders

    async tpsl(params, side = null, nosubmit = false) {
        params['reduce'] = "true";
        params['cancelall'] = "true";
        await this.stoploss(params, side, nosubmit);
        await this.takeprofit(params, side, nosubmit);        
    }

    // Trailstop Order

    async trailstop(params) {

        if (params.stub !== undefined && params.symbol != undefined) {
            if (!await this.check_ignored(params.stub, params.symbol)) {
                return false;
            }
        }

        var schema = {
            stub:        { required: 'string', format: 'lowercase', },
            symbol:      { required: 'string', format: 'uppercase', },
            trailstop:   { required: 'string'},
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        return await this.create_and_submit_order('trailstop', params);
    }


    // Close Order

    async close(params) {

        if (params.stub !== undefined && params.symbol != undefined) {
            if (!await this.check_ignored(params.stub, params.symbol)) {
                return false;
            }
        }

        var schema = {
            stub:        { required: 'string', format: 'lowercase', },
            symbol:      { required: 'string', format: 'uppercase', },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 
        if (params.size == undefined || params.size == '100%') params['cancelall'] = true;

        return await this.create_and_submit_order('close', params);
    }

    // Close All Positions on a Stub

    async closeall(params) {

        var schema = {
            stub:        { required: 'string', format: 'lowercase', },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 
        
        var stub = params.stub;
        var positions = await this.positions(params);

        if (this.utils.is_array(positions)) {
            for(var i = 0; i < positions.length; i++) {
                var symbol = positions[i].symbol;
                await this.create_and_submit_order('close', {stub: stub, symbol: symbol, cancelall: true});
            }
        }
        return true;

    }

    // Get a specific order
    
    async order(params) {

        var schema = {
            stub:   { required: 'string', format: 'lowercase', },
            id:     { required: 'string',  },
            symbol: { optional: 'string',  },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        let filter = {};
        const stub = params.stub
        const filterkeys = ['id', 'symbol'];
        filterkeys.forEach(key => {
            if (params[key] != undefined) {
                filter[key] = params[key];
            }
        })
        let result = await this.exchange_execute(stub, 'order', filter);
        if (result != false) {
            this.output.success('orders_retrieve', 1)
            return result;        
        }
        this.output.error('orders_retrieve')
        return false;
    }

    // Get list of orders
    
    async orders(params) {
        const stub = params.stub
        let result = await this.exchange_execute(stub, 'orders',params);
        if (this.utils.is_array(result)) {
            this.output.success('orders_retrieve', result.length)
            return result;        
        } else {
            this.output.error('orders_retrieve')
            return false;
        }
    }

    
    // Cancel orders
    
    async cancel(params) {

        var schema = {
            stub:   { required: 'string', format: 'lowercase', },
            symbol: { required: 'string', format: 'uppercase', },
            id:     { required: 'string',  },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        const stub = params.stub
        let result = await this.exchange_execute(stub, 'cancel',params);
        if (this.utils.is_array(result) && result.length == 1) {
            this.output.notice('order_cancel', params.id)
        } else {
            this.output.error('order_cancel', params.id)
        }
        return result;
    }


    // Cancel all orders
    
    async cancelall(params) {

        var schema = {
            stub:        { required: 'string', format: 'lowercase', },
            symbol:      { required: 'string', format: 'uppercase', },
            type:        { optional: 'string', format: 'lowercase', },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        const stub = params.stub
        let result = await this.exchange_execute(stub, 'cancel_all',params);
        if (this.utils.is_array(result)) {
            this.output.notice('orders_cancel', result.length)
        } else {
            this.output.error('orders_cancel')
        }
        return result;
    }

    // Get position
    
    async position(params) {

        var schema = {
            stub:        { required: 'string', format: 'lowercase', },
            symbol:      { required: 'string', format: 'uppercase', },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        const stub = params.stub
        var result = await this.exchange_execute(stub, 'position',params);
        if (!this.utils.is_array(result)) {
            this.output.success('position_retrieve', result.symbol)
        } else {
            this.output.error('position_retrieve', this.utils.serialize( this.utils.remove_props(params, ['stub']) ))
        }
        return result;
    }

    
    // Get positions
    
    async positions(params) {

        var schema = {
            stub:        { required: 'string', format: 'lowercase', },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        const stub = params.stub
        var result = await this.exchange_execute(stub, 'positions', params);
        if (this.utils.is_array(result)) {
            this.output.success('positions_retrieve', result.length)
            /*
            result.forEach(position => {
                this.output.debug('custom_object', [position.symbol, position]);
            });
            */
        } else {
            this.output.error('positions_retrieve')
        }
        return result;
    }


    // Get balances
    
    async balances(params) {

        var schema = {
            stub:        { required: 'string', format: 'lowercase', },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        const stub = params.stub
        var result = await this.exchange_execute(stub, 'balances',params);
        if (this.utils.is_array(result)) {
            this.output.success('balances_retrieve', result.length)
        } else {
            this.output.error('balances_retrieve')
        }
        return result;
    }

    
    // Get market
    
    async market(params) {

        var schema = {
            stub:        { required: 'string', format: 'lowercase', },
            symbol:      { required: 'string', format: 'uppercase', },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        const stub = params.stub
        var result = await this.exchange_execute(stub, 'market', params);
        if (!this.utils.is_array(result)) {
            this.output.success('market_retrieve', result.symbol)
        } else {
            this.output.error('market_retrieve', this.utils.serialize( this.utils.remove_props(params, ['stub']) ))
        }
        return result;        
    }


    // Get markets
    
    async markets(params) {

        var schema = {
            stub:        { required: 'string', format: 'lowercase', },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        const stub = params.stub
        var result = await this.exchange_execute(stub, 'markets', params);
        if (this.utils.is_array(result)) {
            this.output.success('markets_retrieve', result.length)
        } else {
            this.output.error('markets_retrieve')
        }
        return result;
    }

    // Set leverage for symbol
    
    async leverage(params) {

        if (!params.hasOwnProperty('leverage')) {
            params['leverage'] = "20";
        }

        var schema = {
            stub:        { required: 'string', format: 'lowercase', },
            symbol:      { required: 'string', format: 'uppercase', },
            type:        { required: 'string', format: 'lowercase', oneof: ['cross', 'isolated'] },
            leverage:    { required: 'string', format: 'lowercase', },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        const stub = params.stub
        var result = await this.exchange_execute(stub, 'leverage',params);
        if ((result !== false) && (result.result !== 'error')) {
            this.output.success('leverage_set', [params.symbol, params.leverage.toLowerCase().replace('x',''), params.type])
        } else {
            this.output.error('leverage_set', params.symbol)
        }

    }


    // Get order history

    async order_history(params) {

        var schema = {
            stub:        { required: 'string', format: 'lowercase', },
            symbol:      { optional: 'string', format: 'uppercase', },
            days:        { optional: 'number' },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [stub, symbol, days] = this.utils.extract_props(params, ['stub', 'symbol', 'days']);

        if (days == undefined) {
            var ts = 1
        } else {
            var ms = 1000 * 60 * 60 * 24 * days
            var ts = Date.now() - ms;
        }

        console.log('Duration (ms):' + ms)
        console.log('Start timestamp: ' + ts);
        console.log('End timestamp: ' + Date.now());

        var all_orders = {};
        var order_params = { 
            stub: stub,
            since: ts
        }

        if (symbol != undefined) order_params['symbol'] = symbol;

        var orders =  await this.exchange_execute(stub, 'order_history', order_params, true);

        while (orders.length > 0) {

            orders = orders.sort((a, b) => a.timestamp < b.timestamp ? -1 : 1)
            var batch_ts = {
                standard: 0,
                conditional: 0
            }

            for (var i = 0; i < orders.length; i++) {

                var order = orders[i];
                if (!all_orders.hasOwnProperty(order.id)) {
                    all_orders[order.id] = order;
                }

                if (['market','limit'].includes(order.type)) {
                    if (order.timestamp > batch_ts.standard) {
                        batch_ts.standard = order.timestamp;
                    } 
                } else {
                    if (order.timestamp > batch_ts.conditional) {
                        batch_ts.conditional = order.timestamp;
                    } 
                }

            }

            if (batch_ts.standard == 0) batch_ts.standard = batch_ts.conditional;
            if (batch_ts.conditional == 0) batch_ts.conditional = batch_ts.standard;

            var mints = Math.min(batch_ts.standard, batch_ts.conditional);
            if (mints == 0) break;

            order_params.since = mints + 1;
            console.log(mints + ' : ' + orders.length);
            console.log(order_params)
            orders =  await this.exchange_execute(stub, 'order_history', order_params, true);
        }

        return Object.values(all_orders);

    }

    // Get PNL from order history

    async pnl(params) {

        var schema = {
            stub:        { required: 'string', format: 'lowercase', },
            symbol:      { optional: 'string', format: 'uppercase', },
            days:        { required: 'number' },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [stub, symbol, days] = this.utils.extract_props(params, ['stub', 'symbol', 'days']);

        var position = await this.exchange_execute(stub, 'position',params);
        
        //var orders =  await this.exchange_execute(stub, 'orders',params);
        var orders = await this.order_history(params);

        // Symbols

        var orders_by_symbol = {};
        for (var i = 0; i < orders.length; i++) {
            var order = orders[i];
            if (!orders_by_symbol.hasOwnProperty(order.symbol)) orders_by_symbol[order.symbol] = [];
            orders_by_symbol[order.symbol].push(order);
        }

        var symbols = Object.keys(orders_by_symbol);

        var pnl_by_symbol = {}

        symbols.forEach(symbol => {

            var orders = orders_by_symbol[symbol].sort((a, b) => a.timestamp > b.timestamp ? -1 : 1).filter(order => order.filled_base > 0)

            // Check if currently in a position, if so use the position balance for unrealized PNL calc
            var bal_base = this.utils.is_object(position) && position.hasOwnProperty('base_size') ? position.base_size : 0;
            var bal_quote = this.utils.is_object(position) && position.hasOwnProperty('quote_size') ? position.quote_size : 0;
        
            // Cycle backwards through orders and reconstruct balance and group orders for the same position together
            var groups = [];
            var current = [];
     
            for(var n = 0; n < orders.length; n++) {
                var order = orders[n];
                var entry = order;
                delete entry.trigger;
                delete entry.status;
                entry.balance_base = bal_base;
                entry.balance_quote = bal_base * order.price,
                current.push(entry);
                bal_base = (order.direction == 'sell' ? bal_base + order.filled_base : bal_base - order.filled_base);
                bal_quote = (order.direction == 'sell' ? bal_quote + order.filled_quote : bal_quote - order.filled_quote);
                if (bal_base == 0) {
                    var start = order.timestamp;
                    var end = [undefined, start].includes(current[0]) || current.length < 2 ? null : current[0].timestamp;
                    var group = {
                        start: start,
                        end: end,
                        pnl: bal_quote,
                        orders: current.sort((a, b) => a.timestamp < b.timestamp ? -1 : 1)
                    }
                    groups.push(group);
                    current = [];
                    bal_quote = 0
                }
            }
    
            // Sort order groups cronologically
            groups.sort((a, b) => a.start < b.start ? -1 : 1)
    
            pnl_by_symbol[symbol] = new this.classes.pnl(stub, symbol, groups); 


        });

        return pnl_by_symbol;

    }

    
}