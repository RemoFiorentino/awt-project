/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'ea4a1cfc-6db0-4261-b2b9-e7474943e47a': true
       ,'campaign-worker-list': true
    }
};

function computeTarget(context, source) {
    var query;
    query = target.targetChain;
    return  url.format({pathname: 'ea4a1cfc-6db0-4261-b2b9-e7474943e47a', query: query})
};

computeTarget.id = 'on-no-more-images-annotate';

module.exports = computeTarget;
