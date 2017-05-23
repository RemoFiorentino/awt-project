/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'create-campaign-form': true
    }
};

function computeTarget(context, source) {
    var query;
    query = merge(context.elements['create-campaign-view'].toQuery(target), target.targetChain);
    return  url.format({pathname: 'create-campaign-view', query: query})
};

computeTarget.id = 'on-create-campaign-failure';

module.exports = computeTarget;
