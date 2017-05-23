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

    ViewModel.prototype.id = 'on-account-edit-submit';
    ViewModel.prototype.targetChain = {
    };

    ViewModel.prototype.broken = {
       'send-account-edit-data': true
    };

    ViewModel.prototype.compute = function () {
        this.computed = true;
        return Promise.resolve();
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        var source = this.context.elements['account-edit-form'].toObject(),
            targetInputs = {
                'send-account-edit-data$f$fullname': source.fields && source.fields['fullname']
                ,'send-account-edit-data$f$password': source.fields && source.fields['password']
            },
            query;
        var query = this.targetChain;
        return {
            href: url.format({pathname: './send-account-edit-data', query: merge(query, targetInputs)})
        };
    };

    return ViewModel;
};
