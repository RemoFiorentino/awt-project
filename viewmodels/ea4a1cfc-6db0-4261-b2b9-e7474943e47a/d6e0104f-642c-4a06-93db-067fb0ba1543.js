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

    ViewModel.prototype.id = 'd6e0104f-642c-4a06-93db-067fb0ba1543';
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
            pathname = './ea4a1cfc-6db0-4261-b2b9-e7474943e47a',
            source = this.context.elements['campaign-worker-list'].toObject(),
            items = source.items.map(function (item) {
                return {
                    query: {
                        'campaign-worker-list' : item.id
                    },
                };
            }),
            basequery = merge(this.context.elements['ea4a1cfc-6db0-4261-b2b9-e7474943e47a'].toQuery(self), this.targetChain);
        return items.map(function (item) {
            var query = merge(basequery, item.query);
            return {
                href: url.format({pathname: pathname, query: query})
            };
        });
    };

    return ViewModel;
};
