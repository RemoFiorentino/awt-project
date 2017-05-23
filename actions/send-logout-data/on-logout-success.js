/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'logout-view': true
    }
};

function computeTarget(context, source) {
    var query;
    query = target.targetChain;
    return  url.format({pathname: 'logout-view', query: query})
};

computeTarget.id = 'on-logout-success';

module.exports = computeTarget;
