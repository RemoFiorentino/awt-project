/*jslint node: true */
"use strict";

var express = require('express');

exports.createInitializers = function (options) {
    return {
        'home-bar': require('./home-bar').createInitializer(options)
        ,'task-view': require('./task-view').createInitializer(options)
        ,'worker-select-view': require('./worker-select-view').createInitializer(options)
        ,'register-view': require('./register-view').createInitializer(options)
        ,'login-view': require('./login-view').createInitializer(options)
        ,'show-campaign': require('./show-campaign').createInitializer(options)
        ,'manager-view': require('./manager-view').createInitializer(options)
        ,'logout-view': require('./logout-view').createInitializer(options)
        ,'image-upload-view': require('./image-upload-view').createInitializer(options)
        ,'image-selection': require('./image-selection').createInitializer(options)
        ,'image-annotation': require('./image-annotation').createInitializer(options)
        ,'edit-campaign-view': require('./edit-campaign-view').createInitializer(options)
        ,'create-campaign-view': require('./create-campaign-view').createInitializer(options)
        ,'account-edit-view': require('./account-edit-view').createInitializer(options)
    };
};
