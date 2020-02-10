// Main program loader

module.exports = {

    load_all() {
        const fs = require('fs');
        const dir = __dirname.substr(0, __dirname.lastIndexOf( '/' ) ) + '/core';
        global.epibot = {
            modules  : {},
            settings : {},
        };
        this.db();
        fs.readdirSync( dir ).forEach( file => {
            if ((file.indexOf('mod.') == 0) && (file.indexOf('mod.base.') < 0)) {
                var module = file.split('.')[1];
                this.load(module)
            }
        });
        this.map_all();
        this.init_all();
    },

    db() {
        const fs = require('fs');
        const dir = __dirname.substr(0, __dirname.lastIndexOf( '/' ) );
        const dbcfgfile = dir + '/.dbcfg';
        var dbcfgjson = fs.readFileSync(dbcfgfile, {encoding:'utf8', flag:'r'}); 
        if (dbcfgjson.length > 0) {
            var dbcfg = JSON.parse(dbcfgjson);
            var dbtype = (dbcfg.hasOwnProperty('type') ? dbcfg.type : 'sqlite').toLowerCase();
            if (!global.hasOwnProperty('epibot')) global.epibot = {}
            if (!global.epibot.hasOwnProperty('_modules_')) global.epibot._modules_ = {}
            var mod = require(dir + '/core/core.database.' + dbtype)
            var obj = (typeof(mod) == 'function') ? new mod() : mod
            global.epibot._modules_['database'] = obj
        }
    },

    load(module) {
        if (!global.hasOwnProperty('epibot')) global.epibot = {}
        if (!global.epibot.hasOwnProperty('_modules_')) global.epibot._modules_ = {}
        var mod = require('./mod.' + module)
        var obj = (typeof(mod) == 'function') ? new mod() : mod
        global.epibot._modules_[module] = obj
    },

    map_all() {
        Object.keys(global.epibot._modules_).forEach(module => {
            if (typeof(global.epibot._modules_[module]['module_maps']) == 'function') {
                global.epibot._modules_[module].module_maps()
            }
        })
    },

    init_all() {
        Object.keys(global.epibot._modules_).forEach(module => {
            if (typeof(global.epibot._modules_[module]['initialize']) == 'function') {
                global.epibot._modules_[module].initialize()
            }
        })
    }


}