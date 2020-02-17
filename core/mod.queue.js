
// Order processing queue

const epibot_module = require('./mod.base')
var context = require('express-http-context');

module.exports = class epibot_queue_module extends epibot_module {

    // Constructor

    constructor() {
        super()
    }

    // Initialize a queue
    
    create(stub, symbol) {
        var uuid = context.get('reqId')
        if (!this.hasOwnProperty('queue'))
            this.queue = {}
        if (!this.queue.hasOwnProperty(uuid))
            this.queue[uuid] = {}
        if (!this.queue[uuid].hasOwnProperty(stub))
            this.queue[uuid][stub] = {}
        if (!this.queue[uuid][stub].hasOwnProperty(symbol))
            this.queue[uuid][stub][symbol] = []
        if (!this.hasOwnProperty('results'))
            this.results = {}
        if (!this.results.hasOwnProperty(uuid))
            this.results[uuid] = {}
        if (!this.results[uuid].hasOwnProperty(stub))
            this.results[uuid][stub] = {}
        if (!this.results[uuid][stub].hasOwnProperty(symbol))
            this.results[uuid][stub][symbol] = []            
    }


    // Clear order queue
    
    clear(stub, symbol) {
        var uuid = context.get('reqId')
        this.create(stub, symbol)
        this.queue[uuid][stub][symbol] = []
        this.results[uuid][stub][symbol] = []
    }


    // Add order to queue
    
    add(stub, symbol, params) {
        var uuid = context.get('reqId')
        this.create(stub, symbol)
        if (!this.utils.is_array(params)) {
            params = [params]
        }
        params.forEach(order => {
            this.output.notice('order_queued', order)
            this.queue[uuid][stub][symbol].push(order)
        });
    }

    // Get queue contents

    get(stub, symbol) {
        var uuid = context.get('reqId')
        this.create(stub, symbol)
        return this.queue[uuid][stub][symbol];
    }

    // Check if order exists (ensure that it was successfully created on the exchange)

    async check(stub, symbol, id) {
        await this.utils.sleep(3);
        var exchange = new this.classes.exchange(stub);
        let result = await exchange.execute(stub, 'order', {id: id, symbol: symbol}, true);
        return (result !== false ? true : false);
    }

    // Submit an order to the exchange

    async submit(stub, symbol, order) {
        var exchange = new this.classes.exchange(stub);
        let result = await exchange.execute(stub, 'create_order', order);
            
        if (result.result == 'success') {
            var id = result.order.id;
            this.output.debug('order_submitted', [id]);
        
            let doublecheck = await exchange.get(stub, 'doublecheck');
            
            if (doublecheck == true) {
                this.output.debug('order_check_enabled', [id]);
                var check = await this.check(stub, symbol, id);
                if (check == true) {
                    // Doublecheck successful
                    this.output.notice('order_check', [id]);
                    return result;
                } else {
                    // Doublecheck failed
                    //this.output.error('order_check', [id]);
                    this.output.warning('order_submit', ['DoubleCheckError: Doublecheck failed for ID: ' + id] ); 
                    return false;
                }

            } else {

                // Doublecheck disabled and order successful
                //this.output.debug('order_check_disabled');
                return result;
            }

        }  
        var message = result.error.type + ': ' + (this.utils.is_object(result.error.message) ? this.utils.serialize_object(result.error.message) : result.error.message);
        this.output.warning('order_submit', [message] ); 
        return false;

    }

    // Process order queue (submit orders to the exchange)

    async process(stub, symbol) {
        var uuid = context.get('reqId')
        this.create(stub, symbol)
        var noexecute = await this.config.get('debug:noexecute', false);
        var maxretry = parseInt(await this.config.get(stub + ':maxretry', 5));
        var retrywait = parseInt(await this.config.get(stub + ':retrywait', 10));
        if (noexecute == true) {
            this.output.debug('debug_noexecute');
            var result = this.queue[uuid][stub][symbol];
            this.clear(stub, symbol);
            return result;
        }
        this.results[uuid][stub][symbol] = []
        var total = this.queue[uuid][stub][symbol].length;
        if (total > 0) { 
            var success = 0;
            this.output.subsection('processing_queue', total);
            this.output.notice('processing_queue', total); 
            
            for (const order of this.queue[uuid][stub][symbol]) {

                var result = null;
        
                for (var retry = 1; retry <= maxretry; retry++) {
                    result = await this.submit(stub, symbol, order);
                    if (result === false) {
                        this.output.warning('order_retry_wait', [retrywait])
                        await this.utils.sleep(retrywait)
                        this.output.warning('order_retry_num', [retry, maxretry])                
                    } else break
                }
                
                
                if (result == false) {
                    //output.set_exitcode(-1);
                    this.output.error('order_submit', { ...{stub: stub}, ...order}); 
                } else {
                    success++;
                    this.output.success('order_submit', { ...{stub: stub}, ...order}); 
                }
        
                this.results[uuid][stub][symbol].push(result);
            };
            var results = this.results[uuid][stub][symbol];
            this.output.notice('processed_queue', [success, total]);   
            this.clear(stub, symbol);
            if (success == 0) {
                return false;
            }
            return results;
        } else return true;
    }


}