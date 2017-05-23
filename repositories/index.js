/*jslint node: true */
"use strict";

exports.createRepositories = function (options) {
    var repositories = {}
    repositories['campaign'] = require('./campaign').createRepository(options);
    repositories['workers'] = require('./workers').createRepository(options);
    repositories['tasks'] = require('./tasks').createRepository(options);
    return repositories;
};
