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