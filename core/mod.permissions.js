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
  'trad