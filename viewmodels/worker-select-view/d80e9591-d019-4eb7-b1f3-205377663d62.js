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

    ViewModel.prototype.id = 'd80e9591-d019-4eb7-b1f3-205377663d62';
    ViewModel.prototype.targetChain = {
    };

    ViewModel.prototype.broken = {
       'send-annotator-to-campaign': true
    };

    ViewModel.prototype.compute = function () {
        this.computed = true;
        return Promise.resolve();
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        var self = this,
            pathname = './send-annotator-to-campaign',
            source = this.context.elements['list-available-annotator'].toObject(),
            items = source.items.map(function (item) {
                return {
                    query: {
                        'list-available-annotator': undefined
                    },
                    targetInputs: {
                        'send-annotator-to-campaign$f$id': item['id']
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
