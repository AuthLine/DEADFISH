var express = require('express');
var router = express.Router();
const api = require('../core/core.gui');
const fs = require('fs'); 

// Create routes

Object.keys(api).forEach(baseapi => {

    var routes = api[baseapi];

    for (var [routeinfo, command] of Object.entries(routes)) {

        var [method, route] = routeinfo.split('|')

        //route = baseapi + route
        
        router[method](route, async function(req, res, next) {            

            const core = global.epibot._modules_.core

            const routeparts = req.route.path.split('/')
            const baseapi = '/' + routeparts[1]
            const route = '/' + routeparts.slice(1).join('/')

            const api = require('../core/core.gui');
            var baseapis = Object.keys(route);
            for (var i =0; i < baseapis.count; i++) {
                const routes = api.hasOwnProperty(baseapi) ? api[baseapi] : null
                if (routes != null) break;
            }
            const routeinfo = [req.method.toLowerCas