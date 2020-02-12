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
            
        if (!localhost && isapi && multiuser && param_uuid == null && token_uuid == null) {
            //uuid = core_uuid;
            this.output.debug('access_api_core')
            //context.set('uuid', uuid);
            return (all_ip_allowed.includes(command) ? true : await this.whitelist.verify(ip));
        }

        if (isapi && !multiuser && param_uuid == null) {
            uuid = core_uuid;
            this.output.debug('access_api_core')
            context.set('uuid', uuid);
            return (all_ip_allowed.includes(command) ? true : await this.whitelist.verify(ip));
        }

        if (isapi && !multiuser && param_uuid != null) {
            uuid = param_uuid;
            this.output.debug('access_api_uuid')
            context.set('uuid', uuid);
            return (all_ip_allowed.includes(command) ? true : await this.whitelist.verify(ip));
        }

        return false;

    }

    // Parse request

    parse_request(request) {
        // Single pre-parsed command parameter
        if (request.body.hasOwnProperty('command')) return request.body;
        // Multiple pre-parsed command parameters
        if (this.utils.is_array(request.body) && request.body[0].hasOwnProperty('command')) return request.body;
        // Raw request body
        return this.parse_raw(request.rawBody);
    }
    

    // Parse raw text into parameter object

    parse_raw(text) {
        var lines = (text.trim() + '\n').split('\n');
        var commands = [];
        for (var l = 0; l < lines.length; l++) {
            var line = lines[l];
            if (line.trim() != '') {
                var params = line.split(' ').filter(part => part.toLowerCase() != 'epibot');
                var paramObj = {};
                if (Array.isArray(params)) {
                    var command = false;
                    for(var i = 0; i < params.length; i++) {
                        var param = params[i].trim();
                        if (param.toLowerCase() != 'epibot') {  // In case user included the "epibot" in the webhook command
                            if ((param.indexOf('=') < 0) && param.indexOf(':') >= 0 && (command == false)) {
                                command = true;
                                param = 'command='+param;
                            }
                            var [key, val] = param.split('=');
                            paramObj[key] = val;
                        } 
                    }
                    commands.push(paramObj);
                }    
            }
        }
        return (commands.length == 1 ? commands[0] : commands);
    }

    // Parse Command Parameter Object

    parse_obj(params) {
        params = this.utils.clean_object(params);      
        var command = this.utils.extract_props(params, 'command').toLowerCase();
        if (command == undefined) 
            return this.output.error('required_param', ['command']);
        if (command.indexOf(':') < 0) 
            return this.output.error('malformed_param', ['command']);
        var parts = command.split(':');
        var numparts = parts.length;
        if (this.utils.is_array(parts) && parts.length > 1) {
            var mod = parts[0];
            var cmd = parts.slice(1).join(':');
            if (cmd.indexOf(':') > 0) {                 // Check if stub is included in the command
                var [stub, cmd] = cmd.split(':');
                params['stub'] = stub;
            }
            if ((numparts == 2) && (api_methods.trade.includes(cmd)) && (parts[0] !== 'trade')) {
                // "trade:" was excluded from the command, add it
                var stub = mod;
                var mod = "trade";
                params['stub'] = stub;
                this.output.debug('trade_cmd_shortcut', [stub.toLowerCase(), cmd.toLowerCase()]);
            }
        } else {
            return this.output.error('malformed_param', ['command']);
        }
        delete params.command;
        params = this.utils.uppercase_values(params, ['symbol', 'mapping']);
        params = this.utils.lowercase_values(params, ['stub']);
        return [mod, cmd, params];
    }


    // Check if module exists and initialize it

    load_module(module) {
        if (api_methods.hasOwnProperty(module) && this.hasOwnProperty(module)) {
            var mod = require('./mod.'+module)
            this[module] = new mod();
            return true;
        } else {
            return false;
        }
    }


    // Check if a given method exists in a given module

    method_exists(module, method) {
        const loader = require('./core.loader');
        loader.map_all();
        if (api_methods[module].includes(method)) {
            return true;
        }
        return false;
    }
    

    // Execute epibot Command(s)

    async execute(request, raw = null) {
        this.output.reset();
        var params = this.parse_request(request);
        if (this.utils.is_object(params) && params.hasOwnProperty('0') && params['0'].hasOwnProperty('command')) {
            params = Object.values(params);
        }
        if (this.utils.is_array(params)) {                          
            var results = await this.execute_multiple(params, raw);  // Multiple commands submitted
        } else {        
            var results = await this.execute_single(params, raw);     // Single command submitted
        }
        return results;
    }


    // Execute Multiple Commands

    async execute_multiple(multi_params, raw) {
        var results = [];
        if (this.utils.is_object(multi_params)) {
            multi_params = Object.values(multi_params)
        }
        for (var i = 0; i < multi_params.length; i++) {
            var params = multi_params[i];
            if (this.utils.is_object(params)) {
                var result = await this.execute_single(params, raw);
                results.push(result);    
            }
        }
        return await this.output.combine(results);
    }

    // Execute a Single Command
    
    async execute_single(params, raw) {
        var parsed = this.parse_obj(params);
        if (parsed.length == 3) {
            var [module, method, params] = parsed;
            this.output.section('executing_command', [module, method]);
            this.output.notice('executing_command', [module, method]);
            //this.output.notice('command_params', [{ ...{ command: module + ":" + method}, ...(this.utils.remove_props(params,['_raw_'])) }]);
            this.output.notice('command_params', [{ ...{ command: module + ":" + method}, ...params }]);
            if (this.load_module(module)) {
                //this.output.debug('loaded_module', module)    
                var method = this.utils.is_array(method.split(':')) ? method.split(':')[0] : method;
                if (params.hasOwnProperty('uuid')) {
                    context.set('uuid', params.uuid);
                }

                if (this.method_exists(module, method)) {

                    // Check permissions to execute 
                    var permissionset = await this.settings.get('core', 'permissionset', 'standard');
                    if (!['standard','provider'].includes(permissionset))
                        permissionset = 'standard';
                    var checkpermissions = await this.permissions.check(permissionset, { ...{ command: module + ":" + method}, ...params })
                    if (!checkpermissions)
                        return await this.output.parse(this.output.error('permissions_denied', [permissionset, module + ":" + method]));

                    // Start execution
                    var start = (new Date).getTime();
                    global.epibot['command'] = {
                        module: module,
                        method: method
                    };

                    // If no symbol is supplied, use the default symbol
                    if (module != 'symbolmap' && !params.hasOwnProperty('symbol') && params.hasOwnProperty('stub')) {
                        var exchangeid = this.accounts.get_exchange_from_stub(params.stub);
                        if (exchangeid !== false) {
                            var mapping = await this.symbolmap.map(exchangeid, 'DEFAULT');
                            if (mapping !== false) {
                                this.output.notice('symbol_mapping', [exchangeid, 'default', mapping])
                                params.symbol = mapping;
                            } 
                        }
                    }

                    // If stub is supplied, and not adding a new stub, make sure the account exists
                    if (params.hasOwnProperty('stub') && !(module == 'accounts' && method == 'add')) {
                        var stub = params.stub.toLowerCase()
                        if (this.accounts.getaccount(stub) === false) {
                            return await this.output.parse(this.output.error('unknown_stub', stub))
                        } 
                        params.stub = stub
                        context.set('stub', stub);
                    }

                    // Check for symbol mapping and use it if required, verify that market exists
                    if (module != 'symbolmap' && (params.hasOwnProperty('symbol') || params.hasOwnP