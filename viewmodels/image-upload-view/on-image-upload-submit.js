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

    ViewModel.prototype.id = 'on-image-upload-submit';
    ViewModel.prototype.targetChain = {
    };

    ViewModel.prototype.broken = {
       'send-image-upload-data': true
    };

    ViewModel.prototype.compute = function () {
        this.computed = true;
        return Promise.resolve();
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        var source = this.context.elements['image-upload-form'].toObject(),
            targetInputs = {
                'send-image-upload-data$f$image': source.fields && source.fields['image']
                ,'send-image-upload-data$f$name': source.fields && source.fields['name']
            },
            query;
        var query = this.targetChain;
        return {
            href: url.format({pathname: './send-image-upload-data', query: merge(query, targetInputs)})
        };
    };

    return ViewModel;
};
