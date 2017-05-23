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

    ViewModel.prototype.id = '496ca6e1-d56b-4d3d-9567-ca80fbeeb9e5';
    ViewModel.prototype.targetChain = {
    };

    ViewModel.prototype.broken = {
       'show-campaign': true
    };

    ViewModel.prototype.compute = function () {
        this.computed = true;
        return Promise.resolve();
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        var self = this,
            pathname = './show-campaign',
            source = this.context.elements['list-campaign'].toObject(),
            items = source.items.map(function (item) {
                return {
                    query: {
                        'list-campaign': undefined
                    },
                };
            }),
            basequery = this.targetChain;
        return items.map(function (item) {
            var query = merge(basequery, item.query);
            return {
                href: url.format({pathname: pathname, query: query})
            };
        });
    };

    return ViewModel;
};
