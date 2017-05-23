/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'task-view': true
       ,'campaign-worker-list': true
    }
};

function computeTarget(context, source) {
    var query;
    query = target.targetChain;
    return  url.format({pathname: 'task-view', query: query})
};

computeTarget.id = 'on-no-more-images-to-select';

module.exports = computeTarget;
