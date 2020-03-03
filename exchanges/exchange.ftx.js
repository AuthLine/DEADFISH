epibot_exchange_base = require('./exchange.base');

module.exports = class epibot_exchange_ftx extends epibot_exchange_base {

    // Class constructor

    constructor(stub) {
        super(stub);
        this.stablecoins = ['USD', 'USDT'];  // Stablecoins supported on this exchange
        this.order_sizing = 'base';          // Exchange requires base size for orders
        this.collateral_assets = ['BCH','BNB','BTC','BVOL','CUSDT','ETH','FTT','IBVOL','KNC','LINK','LTC','PAXG','SOL','SRM','TRX','TRYB','USD','USDT','XAUT','XRP'];  // Assets that are used for collateral
        this.balances_market_map = '{currency}/{stablecoin