
// Commonly used utility and helper functions

const epibot_module = require('./mod.base')

module.exports = class epibot_utils_module extends epibot_module {

    // Constructor

    constructor() {
        super()
    }


    // Check if value is JSON

    is_json(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    // Check if value is a string

    is_string(val) {
        return (typeof val === 'string');
    }

    // Check if value is boolean

    is_bool(val) {
        return this.is_true(val) || this.is_false(val);
    }


    // Check if value is numeric

    is_numeric(val) {
        return !isNaN(parseFloat(val)) && isFinite(val);
    }


    // Check if value is true

    is_true(val) {
        return ['true', 'yes', '1', 1, true].includes(val);
    }

    
    // Check if value is false

    is_false(val) {
        return ['false', 'no', '0', 0, false].includes(val);
    }


    // Check if value is an object

    is_object(val) {
        return (typeof val === 'object') && (!this.is_array(val));
    }


    // Check if value is an array

    is_array(val) {
        return Array.isArray(val);
    }


    // Check if a value is empty

    is_empty(value) {
        return (
            (value == undefined) ||
            (value == null) ||
            (value.hasOwnProperty('length') && value.length === 0) ||
            (value.constructor === Object && Object.keys(value).length === 0)
        )
    }


    // Check if a value is an IP address

    is_ip(value) {
        const net = require('net')
        return (net.isIPv4(value) || net.isIPv6(value));
    }


    // Check if a value is a function

    is_function(value) {
        return typeof(value) === 'function';
    }


    // Convert timestamp milliseconds to datetime str
    
    ts_to_datetime(ts) {
        let dateobj = new Date(ts);
        let day = ("0" + dateobj.getDate()).slice(-2);
        let month = ("0" + (dateobj.getMonth() + 1)).slice(-2);
        let year = dateobj.getFullYear();
        let hour = ("0" + dateobj.getHours()).slice(-2);
        let minute = ("0" + dateobj.getMinutes()).slice(-2);
        let second = ("0" + dateobj.getSeconds()).slice(-2);
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    }


    // Force a value to be an array if it not already an array

    force_array(val) {
        return this.is_array(val) ? val : [val];
    }


    // Check if the object is missing any of the supplied properties

    missing_props(obj, props = []) {
        if (!this.is_object(obj)) return false;
        if (!this.is_array(props)) props = [props];
        var obj = this.lower_props(obj);
        var result = [];
        for (var i = 0; i < props.length; i++) {
            var prop = props[i].toLowerCase();
            if (!obj.hasOwnProperty(prop)) {
                result.push(props);
            }
        }
        return result;
    }


    // Change all of an objects keys to lowercase

    lower_props(obj) {
        if (obj.hasOwnProperty('_raw_')) delete obj['_raw_'];
        if (this.is_object(obj)) {
            for (var key in obj) {
                if (!obj.hasOwnProperty(key))
                    continue;
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    var val = this.lower_props(obj[key]);
                    delete obj[key];
                    obj[key.toLowerCase()] = val;
                } else {
                    if (key != key.toLowerCase()) {
                        var val = obj[key];
                        if (typeof(val) === 'string') {
                            delete obj[key];
                            obj[key.toLowerCase()] = val;
                        }
                    }
                }
            }
            return obj;
        }
        return false;
    }


    // Walk over object and encrypt properties matching the names provided in the filter array
    // If no filter is supplied, then all properties will be encrypted
    // If no UUID is supplied, the core UUID will be used

    async encrypt_values(obj, filter = null, uuid = null) {
        return await this.walk_values_async(obj, filter, async function(val) {
            return await global.epibot._modules_['encryption'].encrypt(val, uuid);
        }); 
    }


    // Walk over object and decrypt properties matching the names provided in the filter array
    // If no filter is supplied, then all encrypted values will be decrypted
    // If no UUID is supplied, the core UUID will be used

    async decrypt_values(obj, filter = null, uuid = null) {
        return await this.walk_values_async(obj, filter, async function(val) {
            return await global.epibot._modules_['encryption'].decrypt(val, uuid);
        }); 
    }


    // Trim whitespace from object values recursively

    trim_values(obj, filter = null) {
        return this.walk_values(obj, filter, function(val) {
            return typeof(val) === "string" ? val.replace(/^\s+|\s+$/g, '') : val;
        }); 
    }    


    // Walk over object and remove properties with the names provided in the props array element

    remove_props(obj, props = []) {
        if (!this.is_object(obj)) return false;
        for (var key in obj) {
            if (!obj.hasOwnProperty(key))
                continue;
            if (typeof obj[key] === 'object' && obj[key] !== null)
                obj[key] = this.remove_props(obj[key], props);
            else
                if (props.includes(key)) 
                    delete obj[key];
        }
        return obj;
    }


    // Walk over object and remove properties that have the values provided in the vals array element

    remove_values(obj, vals = []) {
        if (!this.is_object(obj)) return false;
        for (var key in obj) {
            if (!obj.hasOwnProperty(key))
                continue;
            if (typeof obj[key] === 'object' && obj[key] !== null)
                obj[key] = this.remove_values(obj[key], vals);
            else
                if (vals.includes(obj[key])) 
                    delete obj[key];
        }
        return obj;
    }
    
    // Walk over object properties recursively and execute a callback function for each of the given properties (if supplied), or all of the properties is no filter is supplied

    walk_values() {
        if (arguments.length < 2) return false;
        if (!this.is_object(arguments[0])) return arguments[0];
        var obj = arguments[0];
        var filter = null;
        var callfunc = null;
        if (arguments.length == 2) 
            callfunc = arguments[1];
        if (arguments.length == 3) {
            filter = arguments[1];
            callfunc = arguments[2];
        }
        if ((filter != null) && (!this.is_array(filter))) 
            throw 'Invalid filter supplied to utils.walk_values()';
        if (!this.is_function(callfunc)) 