// epibot core module

const fs = require('fs');
var context = require('express-http-context');
var cidrcheck = require("ip-range-check");


// Methods exported to the API

const api_methods = {
    
    accounts: [
        'get', 
        'add', 
        'delete', 
        'test',
    ],

    cache: [
        'flush', 
        'stats', 
    ],

    config: [
        'get',
        'set',
    ],

    trade: [
        'long', 
        'short', 
        'buy', 
        'sell', 
        'stoploss', 
        'takeprofit', 
        'trailstop', 
        'tpsl',
        'close', 
        'closeall',
        'market', 
        'markets', 
        'balances', 
        'position', 
        'positions', 
        'order', 
        'orders', 
        'cancel', 
        'cancelall',
        'leverage',
        'pnl',
        'order_history',
    ],

    settings: [
        'get',
        'set',
    ],
    
    symbolmap:  [
        'get', 
        'add', 
        'delete', 
    ],

    whitelist:  [
        'get', 
        'add', 
        'delete',
        'verify',
        'enable',
        'disable', 
    ],

    user: [
        'multiuser_enable',
        'multiuser_disable',
        'enable_2fa',
        'disable_2fa',
        //'verify_2fa',
        'register',
        'login',
        'logout',
        'add',
        'delete',
        'change_password',
        'reset',
        'log',
    ],

    websocket: [
        'subscribe',
        'unsubscribe',
    ],

    gui: [
        'enable',
        'disable',
        'main',
        'register',
        'login',
        'auth_callback',
        'verify_recaptcha',
        'content',
        'data',
        'chart',
    ],

    signals: [
        'add_provider',
        'get_providers',
        'add_exchange',
        'remove_exchange',
        'add_admin',
        'remove_admin',
        'add_ip',
        'remove_ip',
        'send',
        //'is_provider_admin',
    ],

    output: [
        'status',
    ],

    permissions: [
        'add',
        'delete',
        'get',
        'reset',
        'set_type',
    ],

    pnl: [
        'import_orders',
    ],

}

const epibot_module = require('./mod.base')

module.exports = class epibot_core_module extends epibot_module {


    // Constructor

    constructor() {
        super()
        setInterval(this.update_node_status, 10000);
    }

    // Initalize

    initialize() {
    }

    // Update node status

    async update_node_status() {
        const os = require('os');
        const host = os.hostname().toLowerCase();
        const nets = os.networkInterfaces();
        const ips = [];
        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    ips.push(net.address);
                }
            }
        }
        var d = new Date();
        var ts = d.getTime();
        var hostinfo = {
            hostname: host,
            ip: ips,
            timestamp: ts
        }
        if (this.settings == undefined && global.epibot._modules_.hasOwnProperty('settings')) {
            this.settings = global.epibot._modules_['settings'];
        }
        await 