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
        order_check:        'Double-checked that order was created on exchange: {0}',
        symbol_mapping:     'Using symbol mapping: {0}: {1} => {2}',
        tvsymbolmap_map:    'TradingView syminfo.tickerid mapping: {0}: {1} => {2}',
        whitelist_disabled: 'Whitelist verification is disabled',
        whitelist_enabled:  'Whitelist verification is enabled',
        whitelist_verify:   'API Access Granted: {0} is whitelisted',
        database_type:      'Database Type:  {0}',
        database_name:      'Database Name:  {0}',
        position_nopotential:'No open positions or orders on {0}',

    },

    warning: {

        unhandled_exception: 'Unhandled Exception: {0}: {1}',
        testnet_not_avail:  'The exchange {0} does not have a testnet, using mainnet instead.',
        order_over_maxsize: 'The order size of {0} would exceed maxsize. Adjusting order size to {1}.',
        order_rel_close:    'The relative decrease requested is greater than your current position, closing position.',
        order_will_flip:    'The provided order sizing results in a position flip from {0} to {1}',
        order_flip_price:   'The {0} parameter was changed from {1} to {2}',
        maxsize_disabled:   'Warning ({0}/{1}): You have disabled the maxsize parameter requirement. You do so at your own risk!',
        config_get:          'Setting not configured: {0}',
        order_retry_wait:   'Order failed, waiting {0} seconds before retrying...',
        order_retry_num:    'Retrying order (Retry {0} of {1})...',
        order_submit:       'Order submission failed: {0}',
    },

    error: {

        required_param:     'Parameter Required: {0}',  
        required_oneof:     'At least one of the following parameters is required: {0}',  
        param_val_oneof:    'The {0} parameter should be one of {1}',
        incorrect_type:     'Incorrect Type: {0}, Expected: {1}, Actual: {2}',  
        malformed_param:    'Malformed Parameter: {0}', 
        unknown_module:     'Unknown Module: {0}',
        unknown_method:     'Unknown Command: {0}',
        unknown_stub:       'Unknown Account: {0}. Please use accounts:add to add the account.',      
        unknown_market:     'Unknown Market: {0}. Please ensure that the market symbol is listed in \'trade:<stub>:markets\'.',      
        local_only:         'This command can only be executed from the CLI.',
        unhandled_exception: 'Unhandled Exception: {0}: {1}',

        permissions_check:  'Permission denied for command using {0} permission set: {1}',
        permissions_add:    'Failed to add permissions: {0}:{1} => {2}',
        permissions_delete: 'Failed to delete permissions: {0}:{1} => {2}',
        permissions_denied: 'Execute permission denied using {0} permission set: {1}',

        account_retrieve:   'Failed to retrieve account(s): {0}',
        account_create:     'Failed to create account: {0}',
        account_update:     'Failed to update account: {0}',
        account_delete:     'Failed to delete account: {0}',
        account_test:       'Cannot connect using these account settings',
        binance_req_type:   'The Binance exchange requires the type parameter (type=spot or type=futures)',

        encryption_failed:  'Failed to encrypt data',
        decryption_failed:  'Failed to decrypt data',

        cache_flush:        'Failed to flush cache',

        whitelist_get:      'Failed to get IP address(es) from the whitelist: {0}',
        whitelist_add:      'Failed to add IP address to the whitelist: {0}',
        whitelist_delete:   'Cannot delete IP address from the whitelist: {0}',
        whitelist_verify:   'API Access Denied: {0} is not whitelisted',
        whitelist_enable:   'Failed to enable whitelist verification',
        whitelist_disable:  'Failed to disabled whitelist verification',

        symbolmap_get:      'Failed to retrieve symbol mapping: {0}: {1}',
        symbolmap_add:      'Failed to add symbol mapping: {0}: {1} => {2}',
        symbolmap_delete:   'Failed to delete symbol mapping: {0}: {1}',
        tvsymbolmap_map:    'Failed to map TradingView syminfo.tickerid: {0}',
    
        convert_size_usd:   'Size provided in USD, but cannot find a pair to use for conversion',
        order_submit:       'Order submission failed: {0}',
        order_size_nan:     'Could not determine order size: {0}',
        order_size_unknown: 'Could not determine the size of the order',
        order_side_unknown: 'Unable to determine side for order',
        order_too_small:    'Order size is smaller than the minimum size supported by the exchange',
        factor_only_size:   '% or X sizing only allowed on the size parameter',