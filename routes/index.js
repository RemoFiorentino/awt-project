/*jslint node: true */
"use strict";

var express = require('express');

exports.createRouter = function (options) {
    var router = express.Router();
    router.use('/', require('./home-bar').createRouter(options));
    router.use('/task-view', require('./task-view').createRouter(options));
    router.use('/worker-select-view', require('./worker-select-view').createRouter(options));
    router.use('/register-view', require('./register-view').createRouter(options));
    router.use('/login-view', require('./login-view').createRouter(options));
    router.use('/show-campaign', require('./show-campaign').createRouter(options));
    router.use('/manager-view', require('./manager-view').createRouter(options));
    router.use('/logout-view', require('./logout-view').createRouter(options));
    router.use('/image-upload-view', require('./image-upload-view').createRouter(options));
    router.use('/image-selection', require('./image-selection').createRouter(options));
    router.use('/image-annotation', require('./image-annotation').createRouter(options));
    router.use('/edit-campaign-view', require('./edit-campaign-view').createRouter(options));
    router.use('/create-campaign-view', require('./create-campaign-view').createRouter(options));
    router.use('/account-edit-view', require('./account-edit-view').createRouter(options));
    router.use('/change-campaign-state', require('./change-campaign-state').createRouter(options));
    router.use('/get-user-data', require('./get-user-data').createRouter(options));
    router.use('/send-account-edit-data', require('./send-account-edit-data').createRouter(options));
    router.use('/send-create-campaign-data', require('./send-create-campaign-data').createRouter(options));
    router.use('/send-edit-campaign', require('./send-edit-campaign').createRouter(options));
    router.use('/send-image-selection', require('./send-image-selection').createRouter(options));
    router.use('/send-image-upload-data', require('./send-image-upload-data').createRouter(options));
    router.use('/send-images-annotation', require('./send-images-annotation').createRouter(options));
    router.use('/send-login-data', require('./send-login-data').createRouter(options));
    router.use('/send-logout-data', require('./send-logout-data').createRouter(options));
    router.use('/send-registration-data', require('./send-registration-data').createRouter(options));
    router.use('/send-workers-to-campaign', require('./send-workers-to-campaign').createRouter(options));
    router.use('/send-annotator-to-campaign', require('./send-annotator-to-campaign').createRouter(options));
    return router;
};
