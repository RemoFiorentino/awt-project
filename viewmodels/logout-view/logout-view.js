/*jslint node: true */
"use strict";

var Promise = require('bluebird'),
    merge = require('merge');

exports.createInitializer = function (options) {
    function ViewModel(context, req) {
        if (!(this instanceof ViewModel)) { return new ViewModel(context, req); }
        this.context = context;
    }

    ViewModel.prototype.id = 'logout-view';

    ViewModel.prototype.compute = function () {
        if (this.computing) { return this.computing; }
        var self = this;
        return this.computing = Promise.resolve();
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        return {};
    };

    ViewModel.prototype.toQuery = function (event) {
        return merge(
        );
    };

    return ViewModel;
};
