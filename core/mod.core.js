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
        await this.settings.set('node', host, hostinfo);
    }

    // Check if IP address is local to the cluster

    async is_cluster_local_ip(ip) {
        var nodes = await this.settings.get('node');
        if (this.utils.is_object(nodes)) {
            nodes = nodes.hasOwnProperty('hostname') ? [nodes] : Object.values(nodes);
        }
        if (!Array.isArray(nodes)) nodes = [];
        var ips = [];
        try {
            nodes.forEach(node => {
                node.ip.forEach(nodeip => {
                    ips.push(nodeip);
                })
            })
        } catch {
        
        }
        return ips.includes(ip);        
    }

    // Get proxies

    async get_proxies() {
        var proxy = await this.config.get('core:proxy', '');
        return (proxy != '' ? proxy : '');
    }

    // Get port

    async port() {
        const portfile = (__dirname).replace('/core','') + '/.port';
        var port = 80
        try {
          var port = fs.readFileSync(portfile, {encoding:'utf8', flag:'r'}) 
        } catch {
          var port = (process.env.epibot_PORT || 80);
        } 
        return port;       
    }

    // Get loopback URL

    async url() {
        var port = await this.port();
        var defval = 'http://localhost:' + port.toString();
        var url = await this.config.get('core:url', defval);
        return url;
    }

    // Get remote IP address

    async remote_ip(req) {
        var proxy = await this.get_proxies();
        var proxies = proxy.split(',')
        var remoteAddress = req.socket.remoteAddress.replace('::ffff:','').replace('::1, ','');
        //var proxydetected = (Array.isArray(proxies) && proxies.includes(remoteAddress)) ? true : false;
        var proxydetected = cidrcheck(remoteAddress, proxies);
        var ip = ((proxydetected ? req.headers['x-forwarded-for'] : false) || req.socket.remoteAddress).replace('::ffff:','').replace('::1, ','');
        if (await this.is_cluster_local_ip(ip)) {
            var ip = '<cluster>';
        }
        context.set('srcIp', ip);
        var reqId = context.get('reqId')
        if (!proxies.includes(ip))
            this.output.debug('source_ip', [ip, reqId]);
        return ip;
    }

    // Verify if access is allowed using a valid token or whitelist

    async verify_access(ip, uuid, token, params) {
        var command = params != undefined && params.hasOwnProperty('body') && params.body.hasOwnProperty('command') ? params.body.command : null;
        context.set('command', command)
        var core_uuid = await this.encryption.core_uuid();
        var token_uuid = token != null && token.hasOwnProperty('uuid') ? token.uuid : null;
        var param_uuid = uuid;
        var localhost = ['127.0.0.1','::1','<cluster>'].includes(ip);
        var isgui = token != null;
        var isapi = !isgui;
        var multiuser = await this.user.multiuser_isenabled();
        var verified = token != null ? await this.user.verify_token(token) : false;
        var uuid = null;

        var all_ip_allowed = [
            'gui:main',
            'gui:login',
            'gui:register',
            'gui:verify_recaptcha',
            'gui:content',
            'gui:chart',
            'user:register',
            'user:login',
            'signals:send',
        ]

        //console.log({isgui: isgui, isapi : isapi, localhost: localhost, param_uuid: param_uuid, multiuser: multiuser, token_uuid: token_uuid, verified: verified})

        if (!localhost && isapi && multiuser && param_uuid == null && !all_ip_allowed.includes(command)) {
            await this.output.error('required_param', ['uuid']);
            return false;
        }

        if (isgui && all_ip_allowed.includes(command)) {
            return true;
        }

        if (isgui && !verified) {
            await this.output.error('invalid_token');
            return false;
        }

        if (localhost && isapi && param_uuid == null) {
            this.output.debug('access_local_core')
            uuid = core_uuid;
            context.set('uuid', uuid);
            return (all_ip_allowed.includes(command) ? true : await this.whitelist.verify(ip));
        }

        if (isgui && verified) {
            this.output.debug('access_gui_token')
            uuid = token_uuid;
            context.set('uuid', uuid);
            return true;
        }

        if (isapi && multiuser && param_uuid != null) {
            uuid = param_uuid;
            this.output.debug('access_api_uuid')
            context.set('uuid', uuid);
            return (all_ip_allowed.includes(command) ? true : await this.whitelist.verify(ip));
        }
            
        if (!lo