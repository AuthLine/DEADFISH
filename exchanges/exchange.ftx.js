epibot_exchange_base = require('./exchange.base');

module.exports = class epibot_exchange_ftx extends epibot_exchange_base {

    // Class constructor

    constructor(stub) {
        super(stub);
        this.stablecoins = ['USD', 'USDT'];  // Stablecoins supported on this exchange
        this.order_sizing = 'base';          // Exchange requires base size for orders
        this.collateral_assets = ['BCH','BNB','BTC','BVOL','CUSDT','ETH','FTT','IBVOL','KNC','LINK','LTC','PAXG','SOL','SRM','TRX','TRYB','USD','USDT','XAUT','XRP'];  // Assets that are used for collateral
        this.balances_market_map = '{currency}/{stablecoin}'  // Which market to use to convert non-USD balances to USD
        this.doublecheck = true;             // When order is submitted, double check that it exists on the exchange
        this.param_map = {                   // Order parameter mappings
            limit             : 'limit',
            market            : 'market',
            stoploss_limit    : 'stop',
            stoploss_market   : 'stop',
            takeprofit_limit  : 'takeProfit', 
            takeprofit_market : 'takeProfit',
            trailstop         : 'trailingStop', 
            post              : 'postOnly',
            reduce            : 'reduceOnly',
            ioc               : 'ioc',
            tag               : 'clientId',
            trigger           : 'triggerPrice',
        };
    }


    // Custom params

    custom_params(type, order_params, custom_params) {
        if (order_params.type == 'trailingStop') {
            order_params.params['trailValue'] = order_params.params.triggerPrice;
            delete order_params.params.triggerPrice;
        }
        return order_params;
    }    

    
    // Get available equity in USD for placing an order on a specific symbol using size as a factor of equity (size=1x)

    async available_equity_usd(symbol) {
        return await this.total_balance_usd();
    }

    // Get list of current positions

    async positions() { 
        this.set_cache_time('private_get_position', 5);    
        let results = await this.ccxt('private_get_positions', {showAvgPrice: true});
        var raw_positions = results.result;
        await this.markets();
        // Get futures positions
        var positions = []; 
        if (this.utils.is_array(raw_positions)) {
            await raw_positions
            .filter(raw_position => raw_position.size != 0)
            .forEach(async raw_position => {
                const symbol = raw_position.future;
                const market = await this.get_market_by_symbol(symbol);
                const direction = (raw_position.side == 'buy' ? 'long' : 'short');
                const base_size = raw_position.size;
                const entry_price = raw_position.recentAverageOpenPrice;
                const liquidation_price = raw_position.estimatedLiquidationPrice;
                const raw = raw_position;
                const position = new this.classes.position_futures(market, direction, base_size, null, entry_price, liquidation_price, raw);
                positions.push(position)
            })
        }
        // Emulate spot "positions" against USD for non-stablecoin balances
        var balances = await this.balances();
        this.stablecoins.forEach(async (stablecoin) => {
            balances.forEach(async (balance) => {
                if (!this.stablecoins.includes(balance.currency)) {
                    const symbol = balance.currency + '/' + stablecoin;
                    const market = await this.get_market_by_symbol(symbol);
                    if (market != null) {
                        const direction = 'long';
                        const base_size = balance.base.total;
                        const position = new this.classes.position_spot(market, direction, base_size);
                        positions.push(position)
                    }
                }
            });
        });
        this.positions = positions;
        return this.positions;
    }

    // Get list of markets from exchange

    async markets() {
        if (this.data.markets != null) {
            return this.data.markets;
        }
        let results = await this.ccxt('fetch_markets');
        var raw_markets = results;
        this.data.markets = [];
        raw_markets
            .filter(raw_market => raw_market.active == true)
            .forEach(raw_market => {
                const id = raw_market.id;
                const symbol = raw_market.symbol;
                const type = raw_market.info.type;
                const base = raw_market.base;
                const quote = raw_market.quote;
                const bid = parseFloat(raw_market.info.bid);
                const ask = parseFloat(raw_market.info.ask);
                const expiration = (raw_market.expiration != null ? raw_market.expiration : null);
                const contract_size = (raw_market.info.contractSize != null ? raw_market.info.contractSize : 1);
                const precision = raw_market.precision;
                const raw = raw_market.info;
                const tvsymbol = 'FTX:' + symbol.replace('-','').replace('/','');
                const market = new this.classes.marke