/*jslint node: true */
"use strict";

var Promise = require('bluebird'),
    merge = require('merge');

exports.createInitializer = function (options) {
    function ViewModel(context, req) {
        if (!(this instanceof ViewModel)) { return new ViewModel(context, req); }
        this.context = context;
    }

    ViewModel.prototype.id = 'worker-select-view';

    ViewModel.prototype.compute = function () {
        if (this.computing) { return this.computing; }
        var self = this;

        return this.computing = Promise.all([
            this.context.elements['list-available-workers'].compute()
            ,this.context.elements['list-available-annotator'].compute()
            ,this.context.elements['selector-list'].compute()
            ,this.context.elements['annotator-list'].compute()
            ,this.context.elements['go-manager-campaign'].compute()
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
            this.context.elements['list-available-workers'].toQuery(event)
            ,this.context.elements['list-available-annotator'].toQuery(event)
            ,this.context.elements['selector-list'].toQuery(event)
            ,this.context.elements['annotator-list'].toQuery(event)
        );
    };

    return ViewModel;
};
