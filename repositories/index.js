/*jslint node: true */
"use strict";

exports.createRepositories = function (options) {
    var repositories = {}
    repositories['tasks'] = require('./tasks').createRepository(options);
    return repositories;
};
