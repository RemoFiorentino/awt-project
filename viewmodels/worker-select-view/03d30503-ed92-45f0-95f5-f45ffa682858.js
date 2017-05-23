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

    ViewModel.prototype.id = '03d30503-ed92-45f0-95f5-f45ffa682858';
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
            source = this.context.elements['selector-list'].toObject(),
            items = source.items.map(function (item) {
                return {
                    query: {
                        'selector-list' : item.id
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
