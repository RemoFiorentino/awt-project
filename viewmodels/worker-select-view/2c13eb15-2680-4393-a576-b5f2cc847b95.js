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

    ViewModel.prototype.id = '2c13eb15-2680-4393-a576-b5f2cc847b95';
    ViewModel.prototype.targetChain = {
    };

    ViewModel.prototype.broken = {
       'send-workers-to-campaign': true
    };

    ViewModel.prototype.compute = function () {
        this.computed = true;
        return Promise.resolve();
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        var self = this,
            pathname = './send-workers-to-campaign',
            source = this.context.elements['list-available-workers'].toObject(),
            items = source.items.map(function (item) {
                return {
                    query: {
                        'list-available-workers': undefined
                    },
                    targetInputs: {
                        'send-workers-to-campaign$f$id': item['id']
                    }
                };
            }),
            basequery = this.targetChain;
        return items.map(function (item) {
            var query = merge(basequery, item.query);
            return {
                hiddens: item.targetInputs,
                action: url.format({pathname: pathname, query: query})
            };
        });
    };

    return ViewModel;
};
