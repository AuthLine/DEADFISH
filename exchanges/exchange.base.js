
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