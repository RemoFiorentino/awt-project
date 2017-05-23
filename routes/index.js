/*jslint node: true */
"use strict";

var express = require('express');

exports.createRouter = function (options) {
    var router = express.Router();
    router.use('/image-selection', require('./image-selection').createRouter(options));
    router.use('/image-annotation', require('./image-annotation').createRouter(options));
    router.use('/ea4a1cfc-6db0-4261-b2b9-e7474943e47a', require('./ea4a1cfc-6db0-4261-b2b9-e7474943e47a').createRouter(options));
    router.use('/send-image-selection', require('./send-image-selection').createRouter(options));
    router.use('/send-images-annotation', require('./send-images-annotation').createRouter(options));
    return router;
};
