// Symbol Mapping Module

const epibot_module = require('./mod.base')

module.exports = class epibot_symbolmap_module extends epibot_module {

    // Constructor

    constructor() {
        super()
    }
    

    // Get mappings

    async get(params) {

        var schema = {
            exchange: {
                required: 'string',
                format: 'lowercase',
                oneof: ['ftx', 'ftxus', 'deribit', 'binance', 'binanceus', 'bitmex'],
            },
            symbol: {
                optional: 'string',
                format: 'uppercase',
            }
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [exchange, symbol] = this.utils.extract_props(params, ['exchange', 'symbol']);
        var exchange = exchange.toLowerCase();
        var symbol = symbol != undefined ? symbol.toUpperCase() : null;
        var result = (symbol == null ? await this.settings.get('symbolmap:' + exchange) : await this.settings.get('symbolmap:' + exchange, symbol));
        if ((typeof result == 'string') && (symbol != null)) {
            var mapping = result;
            result = {};
            result[symbol] = mapping;
            this.output.debug('symbolmap_get', [exchange, symbol, mapping]);
            return result;
        } else {
            if (result !== false) {
                result = this.utils.remove_values(result, [null, undefined, false]);
                for (var symbol in result) {
                    var mapping = result[symbol];
                    this.output.debug('symbolmap_get', [exchange, symbol, mapping]);
                }
                return result;
            }
            return this.output.error('symbolmap_get', [exchange, symbol]);
        }
    }


    // Add symbol mapping

    async add(params) {

        var schema = {
            exchange: {
                required: 'string',
                format: 'lowercase',
                oneof: ['ftx', 'ftxus', 'deribit', 'binance', 'binanceus', 'bitmex'],
            },
            symbol: {
                required: 'string',
                format: 'uppercase',
            },
            mapping: {
                required: 'string',
                format: 'uppercase',
            }
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [exchange, symbol, mapping] = this.utils.extract_props(params, ['exchange', 'symbol', 'mapping']);
        var exchange = exchange.toLowerCase();
        var symbol = symbol.toUpperCase();
        var mapping = mapping.toUpperCase();
        var data = {
            value: mapping,
        }
        if (this.settings.set('symbolmap:' + exchange, symbol, mapping)) {
            this.output.success('symbolmap_add', [exchange, symbol, mapping]);
            return this.get({exchange: exchange, symbol: symbol});
        }
        return this.output.error('symbolmap_add', [exchange, symbol, mapping]);
    }


    // Delete symbol mapping

    async delete(params) {

        var schema = {
            exchange: {
                required: 'string',
                format: 'lowercase',
      