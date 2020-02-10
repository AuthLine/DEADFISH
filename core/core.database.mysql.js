
// Database Abstraction Layer

const mysql = require(`mysql-await`);
const epibot_database_base_module = require('./core.database.base');

module.exports = class epibot_database_mysql_module extends epibot_database_base_module {

    // Constructor

    constructor() {
        super()
        this.type = 'mysql';
        const fs = require('fs');
        const dir = __dirname.substr(0, __dirname.lastIndexOf( '/' ) );
        const dbcfgfile = dir + '/.dbcfg';
        var dbcfgjson = fs.readFileSync(dbcfgfile, {encoding:'utf8', flag:'r'}); 
        if (dbcfgjson.length > 0) {
            var dbcfg = JSON.parse(dbcfgjson);
            var concfg = {
                "connectionLimit" : 10,
                "host"            : dbcfg.host,
                "port"            : (dbcfg.port > 0 ? dbcfg.port : 3306),
                "user"            : dbcfg.user,
                "password"        : dbcfg.pass,
                "database"        : dbcfg.name
            }
            this.name = dbcfg.name;
            this.db = mysql.createConnection( concfg );    
        }
    }

    // Parse result

    parse(result) {
        for (const i in result) {
            var keys = Object.keys(result[i]) 
            var row = {};
            keys.forEach(key => {
                row[key] = result[i][key];
            });
            result[i] = row;
        }
        return result;
    }

    // Query data from the database

    async query(sql, values = []) {
        var result = await this.db.awaitQuery(sql, values);
        if (result == undefined) return null;
        return this.parse(result);
    }

    // Execute a SQL statement

    async exec(sql, values = []) {
        var result = await this.db.awaitQuery(sql, values);
        var rows = result.hasOwnProperty('affectedRows') ? result.affectedRows : 0;
        return { changes: rows };
    }
    
    // Insert or Replace

    async insertOrReplace(table, data) {
        var sql = '';
        var colList = [];
        var valList = [];
        var actList = [];
        var vals = [];
        //var updList = [];
        for (var key in data) {
            colList.push(key);
            valList.push("?");
            vals.push(this.utils.is_object(data[key]) ? JSON.stringify(data[key]) : data[key]);
            //actList.push(val);
            //updList.push("`" + key + "`= ?");
        }
//        sql = "INSERT INTO `" + table + "` (`" + colList.join("`,`") + "`) VALUES (" + valList.join(",") + ") ON DUPLICATE KEY UPDATE " + updList.join(",") + ";";
        sql = "REPLACE INTO `" + table + "` (`" + colList.join("`,`") + "`) VALUES (" + valList.join(",") + ");";
        return await this.exec(sql, vals);       
    }


}