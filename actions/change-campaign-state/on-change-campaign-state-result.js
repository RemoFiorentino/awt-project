/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'manager-view': true
       ,'list-campaign': true
    }
};

function computeTarget(context, source) {
    var query;
    query = merge(context.elements['manager-view'].toQuery(target), target.targetChain);
    return  url.format({pathname: 'manager-view', query: query})
};

computeTarget.id = 'on-change-campaign-state-result';

module.exports = computeTarget;
