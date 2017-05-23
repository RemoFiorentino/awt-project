/*jslint node: true */
"use strict";

var Promise = require('bluebird'),
    url = require('url'),
    merge = require('merge');

exports.createInitializer = function (options) {
    function ViewModel(context, req) {
        if (!(this instanceof ViewModel)) { return new ViewModel(context, req); }
        this.context = context;
    }

    ViewModel.prototype.id = 'register-btn-pressed';
    ViewModel.prototype.targetChain = {
    };

    ViewModel.prototype.broken = {
       'register-view': true
       ,'register-form': true
    };

    ViewModel.prototype.compute = function () {
        this.computed = true;
        return Promise.resolve();
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        var pathname = './register-view',
            query = this.targetChain;
        return {
            href: url.format({pathname: pathname, query: query})
        };
    };

    return ViewModel;
};
