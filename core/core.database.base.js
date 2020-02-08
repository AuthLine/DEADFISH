// Database Abstraction Layer

const epibot_module = require(__dirname.substr(0, __dirname.lastIndexOf( '/' ) ) + '/core/mod.base')

module.exports = class epibot_database_base_module extends epibot_module {

    // Constructor

    constructor() {
        super()
    }

    // Select data from the database

    async select(table, where = {}, limit = null) {
        var sql = '';
        var whereList = [];
        for (var key in where) {
            whereList.push("`" + key + "` = ?");
        }
        var sql = (limit != null ? "SELECT * FROM (" : "") + "SELECT * FROM `" + table + "`" + (whereList.length > 0 ? " WHERE " + whereList.join(" AND ") : "") + (limit != null ? " ORDER BY uid DESC LIMIT " + limit + ") sub ORDER BY uid ASC" : "") + ";";
        return await this.query(sql, Object.values(where));
    }


    // Insert into table

    async insert(table, data) {
        var sql = '';
        var colList = [];
        var valList = [];
        for (var key in data) {
            colList.push(key);
            valList.push('?');
        }
        sql = "INSERT INTO 