
// Module to manage program settings in the database settings table

const epibot_module = require('./mod.base')
var context = require('express-http-context');
const { cache } = require('ejs');
md5 = require('md5');

const global_keys = ['core', 'whitelist', 'signalprovider', 'symbolmap', 'permissions', 'node'];

module.exports = class epibot_settings_module extends epibot_module {

    // Constructor

    constructor() {
        super()
    }

    // Get settings(s)

    async get(mainkey = null, subkey = null, defval = null, retobj = false) {
        var globalkey = mainkey.indexOf(':') == -1 ? mainkey : mainkey.split(':')[0];
        var uuid = global_keys.includes(globalkey) ? '00000000-0000-0000-0000-000000000000' : context.get('uuid');
        if (uuid == undefined) uuid = '00000000-0000-0000-0000-000000000000';
        var cachekey = md5(uuid + (mainkey != null ? mainkey : '') + (subkey != null ? subkey : ''));
        //var cacheresult = this.cache.get(cachekey)
        //if (cacheresult != undefined) {
        //    return cacheresult;
        //}
        var query = { uuid: uuid };
        if (mainkey != null) query['mainkey'] = mainkey;
        if (subkey != null)  query['subkey'] = subkey;
        var result = await this.database.select('settings', query);
        switch (result.length) {
            case 0      :   if (defval != undefined) {
                                this.set(mainkey, subkey, defval);
                                this.cache.set(cachekey, defval, 60);
                                return defval
                            } else return null;
            case 1      :   var val = result[0].value
                            val = this.utils.is_json(val) ? JSON.parse(val) : val;
                            val = ['true','false','"true"','"false"'].includes(val) ? (String(val.replace(/"/g,"")) == 'true' ? true : false)  : val;
                            if (retobj == true) {
                                var obj = {};
                                var subkey = result[0].subkey
                                obj[subkey] = val
                                this.cache.set(cachekey, obj, 60);
                                return obj;
                            }
                            this.cache.set(cachekey, val, 60);
                            return val;
            default     :   var obj = {};
                            for (var i=0; i < result.length; i++) {
                                var setting = result[i];
                                var subkey = setting.subkey;
                                val = this.utils.is_json(setting.value) ? JSON.parse(setting.value) : setting.value;
                                val = ['true','false','"true"','"false"'].includes(val) ? (String(val.replace(/"/g,"")) == 'true' ? true : false) : val;
                                obj[subkey] = val;
                            }
                            this.cache.set(cachekey, obj, 60);
                            return obj;
        }
    }


    // Set Settings(s)

    async set(mainkey, subkey, value) {
        var globalkey = mainkey.indexOf(':') == -1 ? mainkey : mainkey.split(':')[0];
        var uuid = global_keys.includes(globalkey) ? '00000000-0000-0000-0000-000000000000' : context.get('uuid');
        if (uuid == undefined) uuid = '00000000-0000-0000-0000-000000000000';
        var cachekey = md5(uuid + (mainkey != null ? mainkey : '') + (subkey != null ? subkey : ''));
        //var query = this.database.type == 'mysql' ? { uuid: uuid } : {};
        var query = { uuid: uuid };
        if (mainkey != null) query['mainkey'] = mainkey;
        if (subkey != null)  query['subkey'] = subkey;
        if (value != null && typeof value === 'object' && value.value !== null && Object.keys(value).length == 1) {
            var val = JSON.stringify(value.value)
        } else {
            var val = JSON.stringify(value)
        }
        if (val == null) val = '';
        query['value'] = val;
        var result = await this.database.insertOrReplace('settings', query);
        if (result.changes > 0) {
            var cachekey = md5(uuid + (mainkey != null ? mainkey : '') + (subkey != null ? subkey : ''));
            this.cache.set(cachekey, undefined, 60);
            return true;
        }
        return false;
    }


    // Delete Settings(s)

    async delete(mainkey, subkey) {
        var globalkey = mainkey.indexOf(':') == -1 ? mainkey : mainkey.split(':')[0];
        var uuid = global_keys.includes(globalkey) ? '00000000-0000-0000-0000-000000000000' : context.get('uuid');
        if (uuid == undefined) uuid = '00000000-0000-0000-0000-000000000000';
        var cachekey = md5(uuid + (mainkey != null ? mainkey : '') + (subkey != null ? subkey : ''));
        this.cache.set(cachekey, undefined, 60);
        var query = this.database.type == 'mysql' ? { uuid: uuid } : {};
        if (mainkey != null) query['mainkey'] = mainkey;
        if (subkey != null)  query['subkey'] = subkey;
        var result = await this.database.delete('settings', query);
        if (result.changes > 0) {
            return true;
        }
        return false;
    }


}