/*jslint node: true */
"use strict";

var Promise = require('bluebird'),
    merge = require('merge');

exports.createInitializer = function (options) {
    function ViewModel(context, req) {
        if (!(this instanceof ViewModel)) { return new ViewModel(context, req); }
        this.context = context;
    }

    ViewModel.prototype.id = 'home-bar';

    ViewModel.prototype.compute = function () {
        if (this.computing) { return this.computing; }
        var self = this;

        return this.computing = Promise.all([
            this.context.elements['login-btn-pressed'].compute()
            ,this.context.elements['register-btn-pressed'].compute()
            ,this.context.elements['logout-btn-pressed'].compute()
            ,this.context.elements['account-edit-btn-pressed'].compute()
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
        );
    };

    return ViewModel;
};
