
// Exchange Base Class

const ccxtlib = require ('ccxt');
const md5 = require('md5');
var context = require('express-http-context');

// Normalizer base class

module.exports = class epibot_exchange_base {

    constructor(stub) {
        this.doublecheck = false;                    // When order is submitted, double check that it exists on the exchange
        this.load_modules();
        this.data = {
            symbols: [],
            markets: null,
            balances: null,
            markets_by_id: {},
            markets_by_symbol: {}
        }
        this.interfaces = {
            methods: [
                'positions',
                'position',
                'markets',
                'market',
                'ticker',
                'total_balance_usd',
                'free_balance_usd',
                'available_equity_usd',
                'balances',
                'orders',
                'order_history',
                'cancel',
                'cancel_all',
                'get_market_by_id',
                'get_market_by_symbol',
                'get_market_by_id_or_symbol',
                'create_order',
                'custom_params',
                'leverage',
                'symbols',
            ],
            cache: {
                'balances' : {time: 10, global: false},
                'positions' : {time: 10, global: false},
                'position' : {time: 10, global: false},
                'markets' : {time: 60, global: true},
                'market' : {time: 60, global: true},
                'symbols' : {time: 300, global: true},
                'fetch_markets' : {time: 60, global: true},
                'fetch_orders' : {time: 2, global: false},
                'fetch_open_orders' : {time: 2, global: false},
                'fetch_closed_orders' : {time: 2, global: false},
                'get_market_by_id' : {time: 10, global: true},
                'get_market_by_symbol' : {time: 10, global: true},
                'get_market_by_id_or_symbol' : {time: 10, global: true},
                'private_get_positions' : {time: 10, global: false},
                'fapiPublic_get_ticker_bookticker' : {time: 60, global: true},
                'fapiPrivate_get_positionrisk': {time: 10, global: false}
            }
        }
        this.stub = stub;
        this.load_account();
  
    }

    // Set method cache time

    set_cache_time(method, sec) {
        if (this.interfaces.cache.hasOwnProperty(method)) {
            this.interfaces.cache[method].time = sec
        } else {
            this.interfaces.cache[method] = {time: sec, global: false};
        }
    }

    // Load account

    async load_account() {
        this.account = await this.accounts.getaccount(this.stub);
        if (this.account) {
            this.shortname = await this.accounts.get_shortname_from_stub(this.stub);
            const accountParams = await this.accounts.ccxtparams(this.account);
            const exchangeId = this.account.exchange.replace('ftxus','ftx');
            const exchangeClass = ccxtlib[exchangeId];
            this.ccxtobj = new exchangeClass (accountParams.parameters);
            this.ccxtobj.options.adjustForTimeDifference = true
            try {
                await this.ccxtobj.loadMarkets();    
                return true;
            } catch(error) {
                this.output.exception(error);
                return false;
            }
        }
    }

    // Create module shortcuts

    load_modules() { 
        Object.keys(global.epibot._modules_).forEach(module => {
            if (!['core'].includes(module)) {
                this[module] = global.epibot._modules_[module];
            }
        })
    }

    // Execute method

    async execute(method, params, nocache = false) {
        if (this.utils.is_empty(params)) {
            params = [];
        }
        if (!this.utils.is_array(params)) {
            params = [params];
        }
        await this.markets();
        var result = false;
        if (typeof(this[method]) == 'function') {
            result = await this.normalizer(method, params, nocache);
        } else {
            result = await this.ccxt(method, params, nocache);
        }
        return result;
    }

    // Cache Execute

    async cache_exec(type, method, params = [], nocache = false) {
        if (!this.utils.is_array(params)) params = [params];
        if (this.ccxtobj == undefined) await this.load_account();
        try {
            this.shortname = await this.accounts.get_shortname_from_stub(this.stub);
            var uuid = params.hasOwnProperty('uuid') ? params.uuid : context.get('uuid');
            var cachetime = this.interfaces.cache.hasOwnProperty(method) ? this.interfaces.cache[method].time : null;
            var isglobal = this.interfaces.cache.hasOwnProperty(method) ? this.interfaces.cache[method].global : false;
            var req = context.get('reqId')
            var stat = new this.classes.metric([(isglobal ? 'global' : 'context'), type, this.shortname, method].join(':'));
            stat.start();
            var keyparts = isglobal ? [type, this.shortname, method, this.utils.serialize(params)] : [req, uuid, this.shortname, this.stub, type, method, this.utils.serialize(params)];
            var key = md5(keyparts.join('|'));
            var value = cachetime == null || nocache ? undefined : this.cache.get( key );
            if ( value == undefined ) {
                var result = null;
                switch (type) {
                    case 'normalizer'   :   var result = await this[method](...params);
                                            break;
                    case 'ccxt'         :   var result = await this.ccxtobj[method](...params);
                                            break;
                }
                if (result != null) {this.cache.set( key, result, cachetime );}
            } else {
                stat.cached = true;
                var result = value;
            }
            stat.end();
            this.output.add_stat(stat);
            return result;
        }
        catch (error) {
            return { result: 'error', data: error }
        }
    }

    // Normalizer Wrapper

    async normalizer(method, params = [], nocache = false) {
        return await this.cache_exec('normalizer', method, params, nocache);
    }

    // CCXT Wrapper

    async ccxt(method, params = [], nocache = false) {
        return await this.cache_exec('ccxt', method, params, nocache);
    }

    // Get market by ID

    async get_market_by_id(id) {
        if (this.data.markets == null) {
            await this.markets();
        }
        if (this.data.markets_by_id[id] != null) {
            return this.data.markets_by_id[id];
        }
        return null;
    }

    // Get market by Symbol

    async get_market_by_symbol(symbol) {
        if (this.data.markets == null) {
            await this.markets();
        }
        if (this.data.markets_by_symbol[symbol] != null) {
            return this.data.markets_by_symbol[symbol];
        }
        return null;
    }

    // Get market by ID or symbol

    async get_market_by_id_or_symbol(id_or_symbol) {
        let byid = await this.get_market_by_id(id_or_symbol);
        if (byid != null) {
            return byid;
        } else {
            let bysymbol = await this.get_market_by_symbol(id_or_symbol);
            if (bysymbol != null) {
                return bysymbol;
            }
        }
        return null;
    }

    // Get symbol list

    async symbols() {
        if (this.data.markets == null) {
            await this.markets();
        }
        return this.data.symbols.sort((a, b) => (a > b) ? 1 : -1);
    }

    // Index markets by ID and symbol

    async index_markets() {
        if (this.data.markets != null) {
            this.data.symbols = [];
            this.data.markets_by_id = {};
            this.data.markets_by_symbol = {};
            this.data.markets.forEach(market => {
                var id = market.id;
                var symbol = market.symbol;
                this.data.symbols.push(symbol);
                this.data.markets_by_id[id] = market;
                this.data.markets_by_symbol[symbol] = market;
            });
        }
    }


    // Update non-stablecoin quoted markets with USD price from a stablecoin-quoted market with same base

    async update_markets_usd_price() {
        this.data.markets.forEach((market, index) => {
            var id = market.id;
            var symbol = market.symbol;
            var base = market.base;
            var quote = market.quote;
            var usdbasepair = null;
            var usdquotepair = null;
            if (!this.stablecoins.includes(quote)) {
                market.usd = {
                    base: null,
                    quote: null,
                    pairs: {
                        base: null,
                        quote: null,
                    }
                };
                this.stablecoins.forEach(stablecoin => {
                    var pair = base + '/' + stablecoin;
                    if (this.data.markets_by_symbol[pair] && !usdbasepair) {
                        market.usd.base = this.data.markets_by_symbol[pair].avg;
                        market.usd.pairs.base = pair;
                    }
                    var pair = quote + '/' + stablecoin;
                    if (this.data.markets_by_symbol[pair] && !usdquotepair) {
                        market.usd.quote = this.data.markets_by_symbol[pair].avg;
                        market.usd.pairs.quote = pair;
                    }
                });
                if ((market.usd.quote != null) && (market.usd.base == null)) {
                    market.usd.base = market.usd.quote * market.avg;
                }    
            } else {
                if (isNaN(market.avg) || market.avg == null) market.avg = (market.bid + market.ask) / 2;
                market.usd = market.avg;
            }
            this.data.markets[index] = market;
            this.data.markets_by_id[id] = market;
            this.data.markets_by_symbol[symbol] = market;
        })
    }


    // Get USD price for a currency

    get_usd_price(currency) {
        var price = null;
        if (this.stablecoins.includes(currency)) {
            price = 1;
            return price;
        } else {
            for (var i = 0; i < this.stablecoins.length; i++) {
                var stablecoin = this.stablecoins[i];
                var mapsymbol = this.balances_market_map.replace('{currency}', currency).replace('{stablecoin}', stablecoin);
                if (this.data.markets_by_symbol.hasOwnProperty(mapsymbol)) {
                    var market = this.data.markets_by_symbol[mapsymbol];
                    if (market != null) {
                        //this.output.debug('custom_object', ['Attempting conversion using market', market])
                        this.output.debug('custom_object', ['Converting using symbol', mapsymbol]);
                        price = ((market.bid * 1) + (market.ask * 1)) / 2;
                        return price;
                    } else {
                        //this.output.debug('custom_object', ['Null conversion market', mapsymbol])
                    }
                } else {
                    //this.output.debug('custom_object', ['Invalid conversion market', mapsymbol])
                }
            };
        }
        return false;
    }


    // Get account balances

    async balances() {
        if (this.data.balances != null) {
            return this.data.balances;
        }
        let results = await this.execute('fetch_balance');
        //this.output.debug('custom_object', ['Balance response from CCXT', results])
        //this.output.debug(results)
        await this.markets();
        if (results.result != 'error') {
            var raw_balances = results.hasOwnProperty('data') ? results.data : results;
            delete raw_balances.info;
            delete raw_balances.free;
            delete raw_balances.used;
            delete raw_balances.total;
            var balances = [];
            Object.keys(raw_balances)
                .forEach(currency => {
                    var raw_balance = raw_balances[currency];
                    if (raw_balance.total != false) {
                        //this.output.debug('custom_object', ['Calculating USD value for currency', currency])
                        //this.output.debug('custom_object', ['Input balance object', raw_balance])
                        //this.output.debug(raw_balance)
                        const used = raw_balance.used;
                        const free = raw_balance.free;
                        const total = raw_balance.total;
                        var price = this.get_usd_price(currency)
                        //this.output.debug('custom_object', ['Conversion price detected', price])
                        const balance = new this.classes.balance(currency, price, free, used, total);
                        //this.output.debug('custom_object', ['Output balance object', balance])
                        //this.output.debug(balance)
                        if (total != 0) {
                            balances.push(balance);
                        }
                    }
                });
            this.data.balances = balances;
            return balances;
        }   
        return [];
    }

    // Get total of all equity assets in USD

    async balance_usd() {
        await this.balances();
        var free = 0;
        var used = 0;
        var total = 0;
        this.data.balances.forEach(balance => {
            free += balance.usd.free;
            used += balance.usd.used;
            total += balance.usd.total;
        });
        var usd = {
            free: free,
            used: used,
            total: total,
        }
        return usd;
    }

    // Get free USD balance

    async free_balance_usd() {
        await this.balances()
        var free = 0;
        this.data.balances.forEach(balance => {
            free += balance.usd.free;
        });
        return free;
    }

    // Get total USD balance

    async total_balance_usd() {
        await this.balances()
        var total = 0;
        this.data.balances.forEach(balance => {
            total += balance.usd.total;
        });
        return total;
    }

    // Merge orders

    merge_orders(orders1, orders2) {
        if (!this.utils.is_array(orders1)) orders1 = [];
        if (!this.utils.is_array(orders2)) orders2 = [];
        var merged = [...orders1, ...orders2];
        return merged.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1);
    }

    // Parse orders

    parse_orders(raworders) {
        var orders = [];
        raworders.forEach(raworder => {
            orders.push(this.parse_order(raworder));
        });
        return orders;
    }

    // Get order parameter mappings

    get_order_param_map() {
        return this.param_map;
    }

    // Get exchange order sizing (base or quote)

    get_order_sizing() {
        return this.order_sizing;
    }

    // Get market for specific filter

    async market(filter) {
        let markets = await this.markets();
        let result = this.utils.filter_objects(markets, filter);
        if (this.utils.is_array(result) && result.length == 1) {
            return result[0];
        }
        return result;
    }

    // Get ticker for a symbol

    async ticker(symbol) {
        let results = await this.ccxt('fetch_ticker', symbol);
        if (results.result == 'success') {
            return results.data;
        }
        return null;
    }

    // Dump position debug data

    position_debug(positions) {
        var data = {};
        for(var i = 0; i < positions.length; i++) {
            var position = positions[i];
            data[position.symbol] = {
                direction: position.direction,
                size: position.base_size
            }
        }
        this.output.debug(data);
        
    }

    // Get position for specific filter
    
    async position(filter) {
        let positions = await this.execute('positions');
        //this.output.debug('custom_object', ['Positions before filter ('+this.utils.serialize(filter)+')', positions]);
        //this.position_debug(positions);
        let result = this.utils.filter_objects(positions, filter);
        //this.output.debug('custom_object', ['Positions after filter ('+this.utils.serialize(filter)+')', result]);
        //try {
        //    this.position_debug(result);
        //} catch (e) {
        //    this.output.debug('custom_object', ['Error outputting debug info', e])
        //} finally {
        return this.utils.is_array(result) ? (result.length == 1 ? result[0] : result) : [];
        //}
    }

    // Create new order

    async create_order(params) {
        var [symbol, type, side, amount, price, order_params] = this.utils.extract_props(params, ['symbol', 'type', 'side', 'amount', 'price', 'params']);
        var market = await this.get_market_by_id_or_symbol(symbol);
        symbol = market.symbol;
        let create_result = await this.ccxt('create_order',[symbol, type, side, amount, price, order_params]);
        if (create_result.result == 'error') {
            var errortype = create_result.data.name;
            var trimerr = create_result.data.message.replace('ftx','').replace('deribit','')
            if (this.utils.is_json(trimerr)) {
                var errormsg = JSON.parse(trimerr).error;
                var result = {result: 'error', params: params, error: {type: errortype, message: errormsg}};
            } else {
                var errormsg = create_result.data.message;
                var result = {result: 'error', params: params, error: {type: errortype, message: errormsg}};
            }
        } else {
            var result = {result: 'success', params: params, order: this.parse_order(create_result)};
        }
        return result;
    }


    // Get order by id

    async order(params) {
        var [symbol, id] = this.utils.extract_props(params, ['symbol', 'id']);
        var orders = await this.all_orders({symbol: symbol});
        if (orders.length > 0) {
            for (var i = 0; i < orders.length; i++) {
                var order = orders[i]
                if (String(order.id) == String(id)) {
                    return order
                }
            }
        }
        return false;
    }


    // Get orders

    async orders(params) {
        if (params == undefined) {
            params = { id: 'all'};
        }
        var status = this.utils.extract_props(params, ['status']);
        if (status == 'open') {
            var orders = await this.open_orders(params);    
        } else {
            var orders = await this.all_orders(params);
        }
        var filterkeys = ['status', 'type', 'direction', 'id'];
        for (var i = 0; i < filterkeys.length; i++) {
            var key = filterkeys[i];
            if (params[key] != undefined) {
                orders = orders.filter(order => order[key] == params[key]);
            }
            
        }
        return orders;
    }

    // Get order history

    async order_history(params) {
        return await this.all_orders(params);
    }

    // Cancel all orders
    
    async cancel_all(params) {
        if (params.type !== undefined) {
            var orders = await this.open_orders(params);  
            var results = [];
            for (var i = 0; i < orders.length; i++) {
                var order = orders[i];
                var response = await this.cancel({symbol: params.symbol, id: order.id});
                results.push(Array.isArray(response) ? response[0] : response);
            }
            return results;
        } else {
            params.id = 'all';
            return this.cancel(params);
        }
    }
    
    // Default leverage function (if not supported by exchange)

    async leverage(params) {
        return this.output.error('leverage_unsupported')
    }

}