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

    ViewModel.prototype.id = 'on-create-campaign-submit';
    ViewModel.prototype.targetChain = {
    };

    ViewModel.prototype.broken = {
       'send-create-campaign-data': true
    };

    ViewModel.prototype.compute = function () {
        this.computed = true;
        return Promise.resolve();
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        var source = this.context.elements['create-campaign-form'].toObject(),
            targetInputs = {
                'send-create-campaign-data$f$annotation_replica': source.fields && source.fields['annotation_replica']
                ,'send-create-campaign-data$f$annotation_size': source.fields && source.fields['annotation_size']
                ,'send-create-campaign-data$f$name': source.fields && source.fields['name']
                ,'send-create-campaign-data$f$selection_replica': source.fields && source.fields['selection_replica']
                ,'send-create-campaign-data$f$threshold': source.fields && source.fields['threshold']
            },
            query;
        var query = this.targetChain;
        return {
            href: url.format({pathname: './send-create-campaign-data', query: merge(query, targetInputs)})
        };
    };

    return ViewModel;
};
