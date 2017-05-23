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

    ViewModel.prototype.id = 'on-register-submit';
    ViewModel.prototype.targetChain = {
    };

    ViewModel.prototype.broken = {
       'send-registration-data': true
    };

    ViewModel.prototype.compute = function () {
        this.computed = true;
        return Promise.resolve();
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        var source = this.context.elements['register-form'].toObject(),
            targetInputs = {
                'send-registration-data$f$account-type': source.fields && source.fields['account-type']
                ,'send-registration-data$f$password': source.fields && source.fields['password']
                ,'send-registration-data$f$fullname': source.fields && source.fields['fullname']
                ,'send-registration-data$f$username': source.fields && source.fields['username']
            },
            query;
        var query = this.targetChain;
        return {
            href: url.format({pathname: './send-registration-data', query: merge(query, targetInputs)})
        };
    };

    return ViewModel;
};
