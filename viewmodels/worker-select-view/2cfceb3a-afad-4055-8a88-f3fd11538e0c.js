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

    ViewModel.prototype.id = '2cfceb3a-afad-4055-8a88-f3fd11538e0c';
    ViewModel.prototype.targetChain = {
    };

    ViewModel.prototype.broken = {
    };

    ViewModel.prototype.compute = function () {
        this.computed = true;
        return Promise.resolve();
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        var self = this,
            pathname = './worker-select-view',
            source = this.context.elements['annotator-list'].toObject(),
            items = source.items.map(function (item) {
                return {
                    query: {
                        'annotator-list' : item.id
                    },
                };
            }),
            basequery = merge(this.context.elements['worker-select-view'].toQuery(self), this.targetChain);
        return items.map(function (item) {
            var query = merge(basequery, item.query);
            return {
                href: url.format({pathname: pathname, query: query})
            };
        });
    };

    return ViewModel;
};
