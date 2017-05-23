/*jslint node: true */
"use strict";

var Promise = require('bluebird'),
    merge = require('merge');

exports.createInitializer = function (options) {
    function ViewModel(context, req) {
        if (!(this instanceof ViewModel)) { return new ViewModel(context, req); }
        this.context = context;
    }

    ViewModel.prototype.id = 'ea4a1cfc-6db0-4261-b2b9-e7474943e47a';

    ViewModel.prototype.compute = function () {
        if (this.computing) { return this.computing; }
        var self = this;

        return this.computing = Promise.all([
            this.context.elements['campaign-worker-list'].compute()
        ]).then(function () {
            self.computed = true;
        });
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        return {};
    };

    ViewModel.prototype.toQuery = function (event) {
        return merge(
            this.context.elements['campaign-worker-list'].toQuery(event)
        );
    };

    return ViewModel;
};
