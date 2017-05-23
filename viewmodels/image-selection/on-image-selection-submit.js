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

    ViewModel.prototype.id = 'on-image-selection-submit';
    ViewModel.prototype.targetChain = {
    };

    ViewModel.prototype.broken = {
       'send-image-selection': true
    };

    ViewModel.prototype.compute = function () {
        this.computed = true;
        return Promise.resolve();
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        var source = this.context.elements['image-selection-form'].toObject(),
            targetInputs = {
                'send-image-selection$f$accepted': source.fields && source.fields['accepted']
            },
            query;
        var query = this.targetChain;
        return {
            href: url.format({pathname: './send-image-selection', query: merge(query, targetInputs)})
        };
    };

    return ViewModel;
};
