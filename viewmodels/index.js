/*jslint node: true */
"use strict";

var express = require('express');

exports.createInitializers = function (options) {
    return {
        'image-selection': require('./image-selection').createInitializer(options)
        ,'image-annotation': require('./image-annotation').createInitializer(options)
        ,'ea4a1cfc-6db0-4261-b2b9-e7474943e47a': require('./ea4a1cfc-6db0-4261-b2b9-e7474943e47a').createInitializer(options)
    };
};
