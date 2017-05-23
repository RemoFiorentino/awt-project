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

    ViewModel.prototype.id = '7d7aa24d-b606-4a4d-95b6-e026635228e0';
    ViewModel.prototype.targetChain = {
    };

    ViewModel.prototype.broken = {
       'send-edit-campaign': true
    };

    ViewModel.prototype.compute = function () {
        this.computed = true;
        return Promise.resolve();
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        var source = this.context.elements['edit-campaign-form'].toObject(),
            targetInputs = {
                'send-edit-campaign$f$annotation_replica': source.fields && source.fields['annotation_replica']
                ,'send-edit-campaign$f$annotation_size': source.fields && source.fields['annotation_size']
                ,'send-edit-campaign$f$name': source.fields && source.fields['name']
                ,'send-edit-campaign$f$selection_replica': source.fields && source.fields['selection_replica']
                ,'send-edit-campaign$f$threshold': source.fields && source.fields['threshold']
            },
            query;
        var query = this.targetChain;
        return {
            href: url.format({pathname: './send-edit-campaign', query: merge(query, targetInputs)})
        };
    };

    return ViewModel;
};
