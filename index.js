/*jslint node: true */
"use strict";

var express = require('express'),
    Promise = require('bluebird');

Promise.config({cancellation: true});

var BASE_PATH = process.env.BASE_PATH || '/';

var repositories = require('./repositories').createRepositories();
var actions = require('./actions').createActions({repositories: repositories});
var viewModels = require('./viewmodels').createInitializers({repositories: repositories});

var app = express();
app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

app.locals.BASE_PATH = BASE_PATH;
if (app.get('env') === 'development') {
    app.locals.pretty = true;
}

app.use(BASE_PATH, require('./routes').createRouter({
    viewModels: viewModels,
    actions: actions
}));

app.use(BASE_PATH, express.static('public'));

app.listen(3001);
