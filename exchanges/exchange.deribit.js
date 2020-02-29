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
                if (this.utils.is_object