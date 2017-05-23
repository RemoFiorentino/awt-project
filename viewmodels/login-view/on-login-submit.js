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

    ViewModel.prototype.id = 'on-login-submit';
    ViewModel.prototype.targetChain = {
    };

    ViewModel.prototype.broken = {
       'send-login-data': true
    };

    ViewModel.prototype.compute = function () {
        this.computed = true;
        return Promise.resolve();
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        var source = this.context.elements['login-form'].toObject(),
            targetInputs = {
                'send-login-data$f$password': source.fields && source.fields['password']
                ,'send-login-data$f$username': source.fields && source.fields['username']
            },
            query;
        var query = this.targetChain;
        return {
            href: url.format({pathname: './send-login-data', query: merge(query, targetInputs)})
        };
    };

    return ViewModel;
};
