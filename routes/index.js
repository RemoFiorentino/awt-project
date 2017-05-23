/*jslint node: true */
"use strict";

var express = require('express');

exports.createRouter = function (options) {
    var router = express.Router();
    router.use('/', require('./home-bar').createRouter(options));
    router.use('/register-view', require('./register-view').createRouter(options));
    router.use('/logout-view', require('./logout-view').createRouter(options));
    router.use('/login-view', require('./login-view').createRouter(options));
    router.use('/account-edit-view', require('./account-edit-view').createRouter(options));
    router.use('/get-user-data', require('./get-user-data').createRouter(options));
    router.use('/send-account-edit-data', require('./send-account-edit-data').createRouter(options));
    router.use('/send-login-data', require('./send-login-data').createRouter(options));
    router.use('/send-logout-data', require('./send-logout-data').createRouter(options));
    router.use('/send-registration-data', require('./send-registration-data').createRouter(options));
    return router;
};
