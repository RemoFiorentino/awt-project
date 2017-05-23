/*jslint node: true */
"use strict";

var express = require('express');

exports.createInitializers = function (options) {
    return {
        'home-bar': require('./home-bar').createInitializer(options)
        ,'register-view': require('./register-view').createInitializer(options)
        ,'logout-view': require('./logout-view').createInitializer(options)
        ,'login-view': require('./login-view').createInitializer(options)
        ,'account-edit-view': require('./account-edit-view').createInitializer(options)
    };
};
