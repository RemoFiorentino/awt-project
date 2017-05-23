/*jslint node: true */
"use strict";

var express = require('express');

exports.createActions = function (options) {
    return {
        'send-image-selection': require('./send-image-selection').createAction(options)
        ,'send-images-annotation': require('./send-images-annotation').createAction(options)
    };
};
