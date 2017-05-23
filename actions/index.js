/*jslint node: true */
"use strict";

var express = require('express');

exports.createActions = function (options) {
    return {
        'get-user-data': require('./get-user-data').createAction(options)
        ,'send-account-edit-data': require('./send-account-edit-data').createAction(options)
        ,'send-login-data': require('./send-login-data').createAction(options)
        ,'send-logout-data': require('./send-logout-data').createAction(options)
        ,'send-registration-data': require('./send-registration-data').createAction(options)
    };
};
