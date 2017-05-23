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

    ViewModel.prototype.id = 'on-image-annotation-submit';
    ViewModel.prototype.targetChain = {
    };

    ViewModel.prototype.broken = {
       'send-images-annotation': true
    };

    ViewModel.prototype.compute = function () {
        this.computed = true;
        return Promise.resolve();
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        var source = this.context.elements['image-annotation-form'].toObject(),
            targetInputs = {
                'send-images-annotation$f$annotation': source.fields && source.fields['annotation']
            },
            query;
        var query = this.targetChain;
        return {
            href: url.format({pathname: './send-images-annotation', query: merge(query, targetInputs)})
        };
    };

    return ViewModel;
};
