// User Module

const epibot_module = require('./mod.base')
var context = require('express-http-context');
var speakeasy = require('speakeasy');
var qrcode = require('qrcode');

module.exports = class epibot_user_module extends epibot_module {

    // Constructor

    constructor() {
        super()
    }

    // Initialize

    async initialize() {
    }

    // Check if any users have been created yet

    async no_users_yet() {
        var result = this.database.query('SELECT * FROM `users` LIMIT 1;');
        if (result.length > 0) 
            return false;
        return true;
    }

    // Enable Multi-User Mode

    async multiuser_enable(params) {
        var ip = context.get('srcIp');
        if (['127.0.0.1','::1',undefined].includes(ip)) {
            var schema = {
                email: {
                    required: 'string',
                },
                password: {
                    required: 'string'
                }
            }
    
            if (!(params = this.utils.validator(params, schema))) return false; 
    
            var [email, password] = this.utils.extract_props(params, ['email', 'password']);

            if (await this.core(email, password)) {
                if (await this.settings.set('core','multiuser:enabled', true)) {
                    return this.output.success('multiuser_enable');
                }
            }
            return this.output.error('multiuser_enable');
        }
        return this.output.error('local_only');
    }

    // Disable Multi-User Mode 

    async multiuser_disable(params = null) {
        var ip = context.get('srcIp');
        if (['127.0.0.1','::1',undefined].includes(ip)) {
            if (await this.settings.set('core','multiuser:enabled', false)) {
                return this.output.success('multiuser_disable');
            }
            return this.output.error('multiuser_disable');
        }
        return this.output.error('local_only');
    }


    // Check if Multi-User is Enabled

    async multiuser_isenabled() {
        //if (this.database.type != 'mysql') 
        //    return false;
        return await this.settings.get('core', 'multiuser:enabled', false);
    }


    // Get user UUID by email address

    async uuid_by_email(email) {
        var result = await this.database.select('users', {email: email});
        if (result.length == 1)
            return result[0].uuid;
        else
            return false;
    }
    
    // Get use token or see if it is still valid for the UI access to the API

    async get_token(uuid, return_token = true) {
        var result = await this.database.select('users', {uuid: uuid});
        if (result.length == 1) {
            var token = result[0]['token'];
            var expiry = result[0]['expiry'];
            var ts = (new Date()).getTime();
            if (ts < expiry) {
                return return_token ? token : true;
            }
        }
        return false;
    }

    // Verify token

    async verify_token(param) {
        var uuid = param.uuid;
        var token = param.token;
        var result = await this.database.select('users', {uuid: uuid});
        if (result.length == 1) {
            var dbtoken = result[0]['token'];
            var dbexpiry = new Date(result[0]['expiry']).getTime();
            var ts = (new Date()).getTime();
            if (token == dbtoken && ts < dbexpiry) {
                return true;
            }
        }
        return false;
    }

    // Set core user email and password

    async core(email, password) {
        var uuid = await this.encryption.core_uuid();
        var password = await this.encryption.encrypt(password, uuid);
        var data = {
            uuid: uuid,
            email: email,
            password: JSON.stringify(password)
        }
        if ((await this.database.insertOrReplace('users', data)).changes > 0)
            return true;
        else
            return false   
    }

    // User Registration

    async register(params) {

        var schema = {
            email: {
                required: 'string',
            },
            password: {
                required: 'string'
            }
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [email, password] = this.utils.extract_props(params, ['email', 'password']);

        if (await this.exists(email)) {
            return this.output.error('user_exists', [email]);
        } else {
            var uuid = this.encryption.new_uuid();
            var password = await this.encryption.encrypt(password, uuid);
            var data = {
                uuid: uuid,
                email: email,
                password: JSON.stringify(password)
            }
            if ((await this.database.insert('users', data)).changes == 1)
                return this.output.success('user_register', [email]);
        }

    }

    // Login user

    async login(params) {

        var schema = {
            email: {
                required: 'string'
            },
            password: {
                required: 'string'
            },
            token2fa: {
                optional: 'string'
            }
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [email, password, token2fa] = this.utils.extract_props(params, ['email', 'password', 'token2fa']);

        var result = await this.database.select('users', { email: email});
        if (result.length == 1) {
            var userdata = result[0];
            var uuid = userdata.uuid;
            var key2fa = await this.get_2fa(uuid);
            var decr_pass = await this.encryption.decrypt(JSON.parse(userdata.password), uuid);
            if (password == decr_pass) {
                if (key2fa !== false) {
                    var verify = await this.verify_2fa(key2fa, token2fa);
                    if (verify === false)
                        return this.output.error('invalid_token')
                }
                this.output.success('user_auth', [email]);
                var token = await this.create_token(uuid);
                if (token !== false)
                    return token;
            }
        }
        return this.output.error('user_auth', [email]);
    
    }

    // Logout

    async logout(params) {

        var uuid = params.hasOwnProperty('uuid') ? params.uuid : false;
        i