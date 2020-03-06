// Language module for handling English (en) translations throughout the application

module.exports = {

    section: {

        epibot_startup:  'epibot Startup',
        executing_command:  'Executing Command: {0}:{1}',

    },

    subsection: {

        order_long:         'Long Order',
        order_short:        'Short Order',
        order_buy:          'Buy Order',
        order_sell:         'Sell Order',
        order_stoploss:     'Stop Loss Order',
        order_takeprofit:   'Take Profit Order',
        order_trailstop:    'Trailing Stop Order',
        order_close:        'Close Order',
        processing_queue:   'Processing order queue: {0} order(s) queued',

    },

    debug: {

        custom_object:      '{0}: {1}',
        context_uuid:       'Context: {0}',
        trade_cmd_shortcut: 'Converting command shortcut \'{0}:{1}\' to \'trade:{0}:{1}\'',
        loaded_module:      'Loaded module: {0}',
        source_ip:          'Connection from IP: {0} (Context ID: {1})',
        whitelist_verify:   'API Access Granted: {0} is whitelisted: {0}',
        whitelist_get:      'Retrieved IP address from the whitelist: {0}: {1}',
        tvsymbolmap_map:    'TradingView syminfo.tickerid mapping: {0}: {1} => {2}',
        symbolmap_get:      'Retrieved symbol mapping: {0}: {1} => {2}',
        position_size:      'Current position size in USD:     {0}',
        balance_avail:      'Current available balance in USD: {0}',
        convert_rel_price:  'Converted relative price: {0}{1} => {2}',
        convert_size_usd:   'Size provided in USD on a stablecoin-paired asset. Using USD size as quote size.',
        convert_size_pair:  'Size provided in USD, using the following pairs for conversion: {0}',
        exchange_size_base: 'Exchange uses base sizing. Order size converted to {0} ({1})',
        exchange_size_quote:'Exchange uses quote sizing. Order size converted to {0} ({1})',
        convert_layered:    'Converted order parameters into {0} layered orders between {1} and {2}',
        order_size_default: 'Size not provided, using default size: {0}',
        order_sl_default:   'Stoploss not provided, using default stoploss: {0}',
        order_tp_default:   'Take profit not provided, using default take profit: {0}',
        order_tpsize_default: 'Take profit size not provided, using default take profit size: {0}',
        order_side_assumed: 'Order side not provided, assuming {0} order.',
        order_size_factor:  'The size of {0} has been converted to {1} ({2})',
        order_sizing_type:  'Order size provided in {0} ({1} size)',
        order_submitted:    'Order submitted to exchange: {0}',
        order_check_enabled:'Order submission doublecheck enabled for exchange, checking order: {0}',
        order_check_disabled:'Order submission doublecheck disabled for exchange',
        close_exceeds_pos:  'The closing order size of {0} exceeds your current position, adjusting order size to {1}.',
        ws_subscribe:       'Subscribed to websocket channel: {0}',
        ws_unsubscribe:     'Unsubscribed from websocket channel: {0}',
        multiuser_createdb: 'Creating multi-tenant database tables (if required)',
        debug_noexecute:    'Order execution disabled, clearing queue',
        access_api_uuid:    'Access granted on API using uuid',
        access_local_core:  'Access granted on localhost using core uuid',
        access_gui_token:   'Access granted using verified token',
        access_api_core:    'Access granted on API using core uuid',
        signal_exec_result: 'Result of signal execution: {0}',
        loopback_url:       'URL Loopback: {0}',
        potential_position: 'Current position and open orders calculated to potential position: {0}',
        permission_granted: 'Execute permission granted using {0} permission set: {1} => {2}',
        permission_denied:  'Execute permission denied using {0} permission set: {1} => {2}',
        cache_flush:        'Successfully flushed cache: {0} items deleted',
        cache_stats:        'Sucessfully retrieved cache stats: {0}',

    },

    notice: {

        output_debug:       'Debug Output: {0}',
        using_language:     'Using Language: {0}',
        executing_command:  'Executing Command: {0}:{1}', 
        command_params:     'Command Parameters: {0}', 
        command_completed:  'Command Completed: Execution Time: {0} seconds',
        processing_queue:   'Processing order queue: {0} order(s) queued',
        processed_queue:    'Processed order queue:  {0}/{1} order(s) submitted successfully.',
        order_sizing_cur:   'Current position {0} size is: {1} {2}',
        order_sizing_tar:   'Target position {0} size is:  {1} {2}',
        order_sizing_ord:   'Order required to reach target: {0} => {1} {2}',
        order_cancel:       'Successfully cancelled order {0}',
        orders_cancel:      '{0} Order(s) cancelled',
        order_queued:       'Order added to queue: {0}',
        order_check:        'Double-checked that order wa