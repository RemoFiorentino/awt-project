/*jslint node: true */
"use strict";

var Promise = require('bluebird'),
    merge = require('merge');

exports.createInitializer = function (options) {
    function ViewModel(context, req) {
        if (!(this instanceof ViewModel)) { return new ViewModel(context, req); }
        this.context = context;
    }

    ViewModel.prototype.id = 'manager-view';

    ViewModel.prototype.compute = function () {
        if (this.computing) { return this.computing; }
        var self = this;

        return this.computing = Promise.all([
            this.context.elements['list-campaign'].compute()
            ,this.context.elements['create-campaign-btn-pressed'].compute()
            ,this.context.elements['go-edit-campaign'].compute()
            ,this.context.elements['change-state-campaign'].compute()
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
            this.context.elements['list-campaign'].toQuery(event)
        );
    };

    return ViewModel;
};
