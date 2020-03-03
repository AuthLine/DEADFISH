const { raw } = require('body-parser');

epibot_exchange_base = require('./exchange.base');

module.exports = class epibot_exchange_deribit extends epibot_exchange_base {

    // Class constructor

    constructor(stub) {
        super(stub);
        this.stablecoins = ['USD', 'USDT'];  // Stablecoins supported on this exchange
        this.order_sizing = 'quote';         // Exchange requires quote size for orders
        this.collateral_assets = ['BTC','ETH'];   // Assets that are used for collateral
        this.balances_market_map = '{currency}-PERPETUAL'  // Which market to use to convert non-USD balances to USD
        this.param_map = {                   // Order parameter mappings
            limit              : 'limit',
            market             : 'market',
            stoploss_limit     : 'stop_limit',
            stoploss_market    : 'stop_market',
            takeprofit_limit   : 'limit', 
            takeprofit_market  : 'limit',
            post               : 'post_only',
            reduce             : 'reduce_only',
            ioc                : 'ioc',         
            tag                : 'label',
            trigger            : 'stop_price',
            stoploss_trigger   : 'stop_price',       
            takeprofit_trigger : 'price',
            trigger_type       : 'trigger',
        };
    }


    // Custom params

    custom_params(type, order_params, custom_params) {
        if (type == 'takeprofit') {
            delete order_params.params.reduce_only
        }
        return order_params;
    }    

    
    // Get available equity in USD for placing an order on a specific symbol using size as a factor of equity (size=1x)

    async available_equity_usd(symbol) {
        var collateral_map = {  
            '-USDT-' : 'USDT',
            'ETH-'   : 'ETH',
            'BTC-'   : 'BTC',
        }
        var keys = Object.keys(collateral_map);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (symbol.includes(key)) {
                var currency = collateral_map[key];
                var raw_balances = await this.fetch_balance(currency);
                if (raw_balances.result == 'success') {
                    raw_balances = raw_balances.data;
                }
                var raw_balance = raw_balances[currency];
                const used = raw_balance.used;
                const free = raw_balance.free;
                const total = raw_balance.total;
                var price = this.get_usd_price(currency)
                const balance = new this.classes.balance(currency, price, free, used, total);
                if (this.utils.is_object(balance)) {
                    return Math.floor(balance.usd.total);
                }
            }    
        }
        return false;
    }

    // Get list of current positions

    async positions() { 
        await this.markets();
        var positions = []; 
        for (var i = 0; i < this.collateral_assets.length; i++) {
            var currency = this.collateral_assets[i];
            var results = await this.ccxt('private_get_get_positions', [{currency: currency, kind: 'future'}]);
            var raw_positions = results.result;
            await raw_positions
                .filter(raw_position => raw_position.size != 0)
                .forEach(async raw_position => {
                    const symbol = raw_position.instrument_name;
                    const market = await this.get_market_by_symbol(symbol);
                    const direction = (raw_position.direction == 'buy' ? 'long' : 'short');
                    const entry_price = raw_position.average_price;
                    const quote_size = raw_position.size;
                    const liquidation_price = raw_position.estimated_liquidation_price;
                    const raw = raw_position;
                    const position = new this.classes.position_futures(market, direction, null, quote_size, entry_price, liquidation_price, raw);
                    positions.push(position)
                })
            }
        this.data.positions = positions;
        return this.data.positions;
    }

    // Get current balances (need to override for Deribit because CCXT is broken)

    async fetch_balance(currency = null) {
        var results = {
            result: 'success',
            data: {},
        };
        var assets = currency == null ? this.collateral_assets : [currency];
        for (var i = 0; i < assets.length; i++) {
            var currency = assets[i];
            this.set_code(currency)
            var rawbalance = await this.ccxt('private_get_get_account_summary',[{currency: currency}]);
            var total = rawbalance.result.equity
            var free = rawbalance.result.available_funds
            var used = total - free;
            results.data[currency] = {
                used: used,
                free: free,
                total: total
            }
        }
        return results;
    }


    // Switch the Deribit code

    set_code(currency)  {
        this.ccxtobj.options = {
            'code': currency,
            'fetchBalance': {
                'code': currency,
            },
        };
    }

    // Get tickers

    async fetch_tickers() {
        var results = {};
        this.data.tickers = {};
        var currencies = this.collateral_assets;
        for (var c = 0; c < currencies.length; c++) {
            var currency = currencies[c];
            var rawtickers = await this.ccxt('public_get_get_book_summary_by_currency', {currency: currency, kind: 'future'});
            var tickers = rawtickers.result;
            for (var j =0; j < tickers.length; j++) {
                var ticker = tickers[j]
                var symbol = ticker.instrument_name
                var bid = ticker.bid_price
                var ask = ticker.ask_price
                results[symbol] = {
                    symbol: symbol,
                    bid:    bid,
                    ask:    ask,
                }

            }
        };
        this.data.tickers = results;
        return results;
    }

    // Get list of markets from exchange

    async markets() {
        if (this.data.markets != null) {
            return this.data.markets;
        }
        await this.fetch_tickers();
        this.data.markets = [];
        var raw_markets = await this.ccxt('fetch_markets');
        raw_markets
            .filter(raw_market => raw_market.active == true && ['spot', 'future'].includes(raw_market.type))
            .forEach(raw_market => {
                const id = raw_market.id;
                const symbol = raw_market.symbol;
                const tvsymbol = 'DERIBIT:' + raw_market.symbol.replace('-','').replace('PERPETUAL', 'PERP')
                const type = raw_market.type;
                if (type != undefined) {
                    const base = raw_market.base;
                    const quote = raw_market.quote;
                    var ticker = this.data.tickers.hasOwnProperty(symbol) ? this.data.tickers[symbol] : null;
                    const bid = ticker != null ? ticker.bid : null;
                    const ask = ticker != null ? ticker.ask : null;
                    const expiration = (raw_market.info.expiration_timestamp != null ? raw_market.info.expiration_timestamp : null);
                    const contract_size = (raw_market.info.contract_size != null ? (symbol == '