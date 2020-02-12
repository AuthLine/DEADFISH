// Encryption/Decryption Subsystem

const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
md5 = require('md5');
const epibot_module = require('./mod.base')

module.exports = class epibot_encryption_module extends epibot_module {

    // Constructor

    constructor() {
        super()
    }

    // Initialize

    initialize() {
        this.algorithm = 'aes-256-ctr';
    }


    // Generate a UUID

    new_uuid() {
        return uuidv4();
    }


    // Get Core UUID

    async core_uuid() {
        var key = await this.settings.get('core', 'uuid');
        if ([null, undefined].includes(key)) {
            key = this.new_uuid();
            if (this.settings.set('core', 'uuid', key)) {
                return key
            }
            return false
        }
        return key
    }


    // Check is value is encrypted

    is_encrypted(val) {
        return (this.utils.is_object(val) && val.hasOwnProperty('iv') && val.hasOwnProperty('content')) ? true : false
    }


    // Encrypt a String

    async encrypt(str, uuid = null) {
        if (this.is_encrypted(str))
            return str;
        if (uuid == null)
            var uuid = await this.core_uuid();
        if (![32, 36].includes(uuid.length)) 
            r