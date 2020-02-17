
// Signal provider management

const epibot_module = require('./mod.base')
var context = require('express-http-context');
const axios = require('axios')

module.exports = class epibot_signals_module extends epibot_module {

    // Get signal provider by UUID

    async get_provider(uuid) {
        var data = await this.settings.get('signalprovider', uuid, false);
        if (data != false) {
            if (!data.hasOwnProperty('admins')) data['admins'] = [];
            if (!data.hasOwnProperty('exchanges')) data['exchanges'] = [];
            if (!data.hasOwnProperty('whitelist')) data['whitelist'] = [];
            return data;
        }
        return false;
    }

    // Set signal provider data by UUID

    async set_provider(uuid, data) {
        return await this.settings.set('signalprovider', uuid, data);
    }

    // Get user config by UUID

    async get_user_config(uuid) {

        var config = await this.database.select('settings', {uuid: uuid, mainkey: 'config'});
        if (config.length == 0) 
            return false;
        var result = {}
        config.forEach(item => {
            result[item.subkey] = JSON.parse(item.value);
        })
        return result;

    }

    // Get user accounts by UUID

    async get_user_accounts(uuid) {

        var accounts = await this.database.select('settings', {uuid: uuid, mainkey: 'accounts'});
        if (accounts.length == 0) 
            return [];
        var result = [];
        accounts.forEach(item => {
            result.push(JSON.parse(item.value));
        })
        return result;
        
    }

    // Get list of signal provider

    async get_providers(params) {

        var providers = await this.settings.get('signalprovider');
        var result = {};
        var data = providers == null ? [] : (providers.hasOwnProperty('uuid') ? [providers] : Object.values(providers));
        if (this.utils.is_array(data)) {
            data.forEach(provider => {
                result[provider.uuid] = provider;
            })
        } 
        if (providers != null && providers != false && this.utils.is_object(providers) && providers.hasOwnProperty('uuid')) {
            result[providers.uuid] = providers;
        }
        return result;

    }

    // Get supported providers by account stub

    async get_providers_by_stub(stub) {

        var account = await this.accounts.get(stub);
        var result = [];
        account = account.hasOwnProperty(stub) ? account[stub] : account;
        if (account) {
            var exchange = account.exchange + (account.hasOwnProperty('type') ? '_' + account.type : '');
            var providers = await this.get_providers();
            if (this.utils.is_object(providers)) {
                var data = Object.values(providers);
                if (data.length > 0) {
                    var result = data.filter(item => item.exchanges.includes(exchange));
                }
            }
        }
        return result;
    }

    // Provider selected

    async is_provider_selected(provider, exchange, except) {
        var accounts = await this.accounts.get();
        accounts = Object.values(accounts);
        for (var i = 0; i< accounts.length; i++) {
            var account = accounts[i]
            var stub = account.stub;
            if (stub != except) {
                var accexchange = account.exchange + (account.hasOwnProperty('type') ? '_' + account.type : '');
                if (exchange == accexchange) {
                    var check = await this.config.get(stub+':provider');
                    if (check == provider) {
                        return true;
                    }
                }
            }
        }   
        return false;
    }

    // Get symbol ignore list for stub

    async get_ignore_list(stub) {
        var markets = await this.trade.markets({stub: stub});
        var ignored = await this.config.get(stub + ':ignored');
        ignored = [null, false, ''].includes(ignored) ? [] : ignored.split(",");
        if (!this.utils.is_array(ignored)) ignored = [];
        var results = [];
        if (this.utils.is_array(markets)) {
            for(var i=0; i< markets.length; i++) {
                var market = markets[i];
                var symbol = market.symbol;
                var ignore = ignored.includes(symbol);
                results.push({ symbol: symbol, ignored: ignore});
            }
        }
        return results;
    }

    // Set symbol ignore list for stub

    async set_ignore_list(stub, list) {
        await this.config.set(stub + ':ignored', list);
    }

    // Set if a symbol is ignored for a stub

    async set_ignore(params) {
        var schema = {
            stub: { required: 'string', format: 'lowercase' },
            symbol: { required: 'string', format: 'uppercase' },
            ignored: { required: 'boolean' }
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [stub, symbol, ignored] = this.utils.extract_props(params, ['stub', 'symbol', 'ignored']);        

        var list = await this.config.get(stub + ':ignored');
        if (this.utils.is_array(list)) {
            if (!list.includes(symbol)) {
                list.push(symbol);
                this.set_ignore_list(stub, list);
            }
        }
    


    }

    // Add new signal provider

    async add_provider(params) {

        var schema = {
            name: { required: 'string' }
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var name = params.name;

        var provider_uuid = this.encryption.new_uuid();

        var data = {
            uuid:   provider_uuid,
            name:   name,
            whitelist: [],
            exchanges: []
        }

        var result = await this.settings.set('signalprovider', provider_uuid, data);
        if (result) {
            this.output.success('add_provider', [name]);
            return provider_uuid;
        }
        return this.output.error('add_provider', [name]);

    }

    // Add provider configuration

    async add_provider_config(params) {

        var schema = {
            provider: { required: 'string', format: 'lowercase' },
            store: { required: 'string' }
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [provider, store, val, key] = this.utils.extract_props(params, ['provider', 'store', 'val', 'key'])

        var data = await this.get_provider(provider);
        if (data == false) {
            return false;
        }

        if (!data.hasOwnProperty(store)) data[store] = this.utils.is_object(val);

        if (!data[type].hasOwnProperty(key))
            data[type][key] = {};

        if (await this.set_provider(provider, data)) {
            return this.output.success('add_provider_exch', [provider, exchange]);
        } else {
            return this.output.error('add_provider_exch', [provider, exchange]);
        }

        
    }

    // Add exchange for signal provider

    async add_exchange(params) {

        var schema = {
            provider: { required: 'string', format: 'lowercase' },
            exchange: { required: 'string', format: 'lowercase', oneof: ['ftx', 'deribit', 'binance_futures', 'binance_spot', 'binance_margin', 'binance_coinm', 'binanceus', 'bitmex'] },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [provider, exchange] = this.utils.extract_props(params, ['provider', 'exchange'])

        var data = await this.get_provider(provider);
        if (!data.hasOwnProperty('exchanges')) data['exchanges'] = [];

        if (!data.exchanges.includes(exchange))
            data.exchanges.push(exchange);

        if (await this.set_provider(provider, data)) {
            return this.output.success('add_provider_exch', [provider, exchange]);
        } else {
            return this.output.error('add_provider_exch', [provider, exchange]);
        }

    }

    // Remove exchange for signal provider

    async remove_exchange(params) {

        var schema = {
            provider: { required: 'string', format: 'lowercase' },
            exchange: { required: 'string', format: 'lowercase', oneof: ['ftx', 'deribit', 'binance_futures', 'binance_spot', 'binanceus', 'bitmex'] },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [provider, exchange] = this.utils.extract_props(params, ['provider', 'exchange'])

        var data = await this.get_provider(provider);
        if (!data.hasOwnProperty('exchanges')) data['exchanges'] = [];

        if (data.exchanges.includes(exchange))
            data.exchanges = data.exchanges.filter(exch => exch != exchange);

        if (await this.set_provider(provider, data)) {
            return this.output.success('del_provider_exch', [provider, exchange]);
        } else {
            return this.output.error('del_provider_exch', [provider, exchange]);
        }

    }

    // Add administrator for signal provider

    async add_admin(params) {

        var schema = {
            provider: { required: 'string', format: 'lowercase' },
            user: { required: 'string', format: 'lowercase' },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [provider, user] = this.utils.extract_props(params, ['provider', 'user'])

        var data = await this.get_provider(provider);
        if (!data.hasOwnProperty('admins')) data['admins'] = [];
        if (!data.admins.includes(user))
            data.admins.push(user);

        if (await this.set_provider(provider, data)) {
            return this.output.success('add_provider_admin', [provider, user]);
        } else {
            return this.output.error('add_provider_admin', [provider, user]);
        }

    }

    // Remove adminiatrator for signal provider

    async remove_admin(params) {

        var schema = {
            provider: { required: 'string', format: 'lowercase' },
            user: { required: 'string', format: 'lowercase' },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [provider, user] = this.utils.extract_props(params, ['provider', 'user'])

        var data = await this.get_provider(provider);
        if (!data.hasOwnProperty('admins')) data['admins'] = [];

        if (data.admins.includes(user))
            data.admins = data.admins.filter(admin => admin != user);

        if (await this.set_provider(provider, data)) {
            return this.output.success('del_provider_admin', [provider, user]);
        } else {
            return this.output.error('del_provider_admin', [provider, admin]);
        }

    }

    // Check if user is a signal provider admin

    async is_admin(provider, user) {

        var data = await this.get_provider(provider);
        if (!data.hasOwnProperty('admins')) data['admins'] = [];

        if (data.admins.includes(user))
            return true;
        
        return false;
    }

    // Add whitelisted IP for signal provider

    async add_ip(params) {

        var schema = {
            provider: { required: 'string', format: 'lowercase' },
            ip: { required: 'ip', format: 'lowercase' },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [provider, ip] = this.utils.extract_props(params, ['provider', 'ip'])

        var data = await this.get_provider(provider);

        if (!data.hasOwnProperty('whitelist')) data['whitelist'] = [];
        if (!data.whitelist.includes(ip))
            data.whitelist.push(ip);

        if (await this.set_provider(provider, data)) {
            return this.output.success('add_provider_ip', [provider, ip]);
        } else {
            return this.output.error('add_provider_ip', [provider, ip]);
        }

    }

    // Remove whitelisted IP from signal provider

    async remove_ip(params) {

        var schema = {
            provider: { required: 'string', format: 'lowercase' },
            ip: { required: 'ip', format: 'lowercase' },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [provider, ip] = this.utils.extract_props(params, ['provider', 'ip'])

        var data = await this.get_provider(provider);
        if (!data.hasOwnProperty('whitelist')) data['whitelist'] = [];

        if (data.whitelist.includes(ip))
            data.whitelist = data.whitelist.filter(address => address != ip);

        if (await this.set_provider(provider, data)) {
            return this.output.success('del_provider_ip', [provider, ip]);
        } else {
            return this.output.error('del_provider_ip', [provider, ip]);
        }

    }

    // Check if IP is in any signal provider whitelist

    async check_ip(uuid, ip) {
        var provider = await this.get_provider(uuid);
        if (provider !== false) {
            var whitelist = provider.whitelist;
            if (whitelist.includes(ip)) {
              return true;
            }
        };
        return false;
    }

    // Send provider signal

    async send(params) {

        var schema = {
            provider: { required: 'string', format: 'lowercase' },
            user: { required: 'string', format: 'lowercase' },
            exchange: { required: 'string', format: 'lowercase', oneof: ['ftx', 'deribit', 'binance_futures', 'binance_spot', 'binanceus', 'bitmex'] },
            signal: { required: 'string', format: 'lowercase', oneof: ['long', 'short', 'buy', 'sell', 'close'] },
            symbol: { required: 'string', format: 'lowercase' },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [provider_uuid, user, exchange, signal, symbol] = this.utils.extract_props(params, ['provider', 'user', 'exchange', 'signal', 'symbol']);

        var signalmap = {
            'long'  : 'buy',
            'short' : 'sell',
        }

        signal = signalmap.hasOwnProperty(signal.toLowerCase()) ? signalmap[signal.toLowerCase()] : signal.toLowerCase();
    
        if ((!Array.isArray(user)) && (typeof(user) == 'string')) {
            var user = user.split(',');
            var user = (!Array.isArray(user) ? [user] : user);
        }

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        var user = user.filter(onlyUnique);

        // Flish the cache before we start

        this.cache.flush(true);

        // Cycle through users and send order requests

        user.forEach(async (user_uuid) => {

            var provider = await this.get_provider(provider_uuid);
            var config = await this.get_user_config(user_uuid);
            if (!provider)
                return this.output.error('invalid_provider', [provider_uuid]);
            
            if (!provider.exchanges.includes(exchange))
                return this.output.error('exch_not_supported', [exchange]);

            var accounts = await this.get_user_accounts(user_uuid);        
            if (this.utils.is_array(accounts))
                accounts = accounts
                    .filter(account => (account.exchange + (account.hasOwnProperty('type') ? '_' + account.type : '')) == exchange)
                    .filter(account => (Object.keys(config).includes(account.stub+':provider') && config[account.stub+':provider'] == provider_uuid))
                    .filter(account => (Object.keys(config).includes(account.stub+':defsize')));

            if (accounts.length == 0) {

                var data = {
                    provider: provider_uuid,
                    user: user_uuid,
                    exchange: exchange,
                    symbol: symbol,
                    result: 0,
                    message: 'No accounts configured for ' + exchange
                }
                this.database.insert('signals',data);
                this.output.debug('signal_exec_result', [data]);
                this.output.error('no_accounts', [exchange, provider_uuid, user_uuid]);

            } else {

                accounts.forEach(async account => {

                    var stub = account.stub;

                    var cmd = {
                        uuid        : user_uuid,
                        command     : 'trade:' + stub + ':' + signal,
                        cancelall   : 'true',
                        reduce      : 'true',
                        symbol      : symbol,
                        source      : { 
                                        type: 'signal',
                                        provider: provider_uuid,
                                        signal: signal
                                    }
                    }

                    var url = await global.epibot._modules_['core'].url();
                    this.output.debug('loopback_url', [url]);

                    // Create new request for the signal processing
                    axios.post(url + '/epibot',  cmd).then(function (response) {
                        var result = response.data;
                        var data = {
                            provider: provider_uuid,
                            user: user_uuid,
                            exchange: exchange,
                            stub: stub,
                            symbol: symbol,
                            signal: signal,
                            result: result.result == 'error' ? 0 : 1,
                            message: result.message != undefined ? result.message : ''
                        }
                        var database = global.epibot._modules_['database'];
                        var output = global.epibot._modules_['output'];
                        database.insert('signals',data);
                        output.debug('signal_exec_result', [data]);
                    });

                    //var core = global.epibot._modules_['core'];
                    //core.execute_single(cmd, true);
            
                });

                this.output.success('signal_queued', [provider_uuid, user_uuid]);
                
            }


        });
        
        return true;

    }

}