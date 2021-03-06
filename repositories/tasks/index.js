/*jslint node: true */
"use strict";

var Promise = require('bluebird'),
    DataStore = require('nedb');

function Repository(options) {
    if (!(this instanceof Repository)) { return new Repository(options); }

    this.db = Promise.promisifyAll(new DataStore({filename: 'tasks'}));
    this.db.insert(require('./default'));
}

Repository.prototype.findById = function (id) {
    return this.db.findOneAsync({id: id});
};

Repository.prototype.find = function (fields, project) {
    return this.db.findAsync(fields, project);
};

exports.createRepository = Repository;
