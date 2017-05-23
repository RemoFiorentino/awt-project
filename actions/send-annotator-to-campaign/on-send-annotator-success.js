/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'annotator-list': true
    }
};

function computeTarget(context, source) {
    var query;
    query = merge(context.elements['worker-select-view'].toQuery(target), target.targetChain);
    return  url.format({pathname: 'worker-select-view', query: query})
};

computeTarget.id = 'on-send-annotator-success';

module.exports = computeTarget;
