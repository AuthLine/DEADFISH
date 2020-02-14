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
  'output:status': 