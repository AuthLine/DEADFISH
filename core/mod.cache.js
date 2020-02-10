// Caching Subsystem

md5 = require('md5');
const NodeCache = require( "node-cache" )
const cache = new NodeCache( { stdTTL: 30, checkperiod: 120 } )

const epibot_module = require('./mod.base')

module.exports = class epibot_cache_module extends epibot_module {

    // Constructor

    constructor() {
        super()
    }

    // Set an item in cache

    set( key, result, time ) {
        return cache.set(key, result, time);
    }

    // Get an item from cache

    get( key ) {
        return cache.get(key);
    }

    // Get cache stats

    stats() {
        var stats = cache.getStats()
        var total = stats.hits + stats.misses;
        var ratio = (total > 0 ? Math.round((stats.hits / total) * 100) : 0);
        var result = {
            hit: stats.hits,
            miss: stats.misses,
    