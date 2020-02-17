// API Permissions Handling

const epibot_module = require('./mod.base')
var context = require('express-http-context');

// Permission defaults

const default_perm = {
  'accounts:add': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'accounts:delete': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'accounts:get': {
    'standard': [
      'core','singleuser',
      'multiuser','user'
    ],
    'provider': []
  },
  'accounts:test': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'cache:flush': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'cache:stats': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'config:get': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'token',
      'local'
    ]
  },
  'config:set': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'token',
      'local'
    ]
  },
  'gui:enable': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'gui:disable': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'gui:chart': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'gui:content': {
    'standard': [
      'token',
      'local',
      'remote'
    ],
    'provider': [
      'token',
      'local',
      'remote'
    ]
  },
  'gui:data': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'gui:login': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'gui:main': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'gui:register': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'gui:verify_recaptcha': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'output:status': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'permissions:add': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'permissions:delete': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'permissions:get': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'permissions:set_type': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'permissions:reset': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'permissions:set': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'settings:set': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:add_admin': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:add_exchange': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:add_ip': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:add_provider': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:get_providers': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:send': {
    'standard': [
      'providerwhitelist'
    ],
    'provider': [
      'providerwhitelist'
    ]
  },
  'signals:remove_admin': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:remove_exchange': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:remove_ip': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'symbolmap:add': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'symbolmap:delete': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'symbolmap:get': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:balances': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:buy': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:cancel': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:cancelall': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:close': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local',
      'token'
    ]
  },
  'trade:closeall': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local',
      'token'
    ]
  },
  'trade:leverage': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:long': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:market': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:markets': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:order': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:order_history': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:orders': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:pnl': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:position': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:positions': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': []
  },
  'trade:sell': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:short': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:stoploss': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:takeprofit': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:tpsl': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:trailstop': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'local'
    ]
  },
  'user:add': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'user:change_password': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:delete': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'user:disable_2fa': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:enable_2fa': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:log': {
    'standard': [
      'core','singleuser',
      'multiuser','user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:login': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'user:logout': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:multiuser_disable': {
    'standard': [
      'local'
    ],
    'provider': []
  },
  'user:multiuser_enable': {
    'standard': [
      'local'
    ],
    'provider': []
  },
  'user:register': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'user:reset': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:add': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:delete': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:disable': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:enable': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:get': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:verify': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  }
}

// Module

module.exports = class epibot_permissions_module extends epibot_module {

    // Check permissions for the command for the specified lockdown type

    async check(type, params) {
        params = params.hasOwnProperty('body') ? params.body : params;
        var command = params.hasOwnProperty('command') ? params.command : undefined;
        var ip = context.get('srcIp');

        var acl = {};
        //acl['ip'] = ip;
        
        var uuidparams = await this.user.uuid_from_params(params);
        if (uuidparams != false) {
            acl['core']  = uuidparams.type == 'core'  ? true : false;
            acl['user']  = uuidparams.type == 'user'  ? true : false;
            acl['token'] = uuidparams.type == 'token' ? true : false;
        }

        acl['local'] = ['127.0.0.1','::1','<cluster>'].includes(ip) ? true : false;
        acl['remote'] = !acl.local;
        acl['multiuser'] = await this.user.multiuser_isenabled();
        acl['singleuser'] = !acl.multiuser;

        // If this is a signal, then make sure the provider is whitelisted

        if (String(command).toLocaleLowerCase() == 'signals:send') {
          var provider = params.hasOwnProperty('provider') ? params.provider : undefined;
          if (provider != undefined) {
            acl['providerwhitelist'] = await this.signals.check_ip(provider, ip);
          }
        }
   
        var def = default_perm.hasOwnProperty(command) ? default_perm[command] : {
            standard: [],    
            provider: []     
        }
        var permissions = await this.settings.get('permissions', command, def);
        var perms = [];
        if (permissions.hasOwnProperty(type))
            var perms = permissions[type];
        
        if (Array.isArray(perms)) {
            for (var i = 0; i < perms.length; i++) {
                var check = (perms[i] + ',').split(',').filter((v) => v != '');
                var result = true;
                for (var j = 0; j < check.length; j++) {
     