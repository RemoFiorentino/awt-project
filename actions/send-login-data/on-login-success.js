/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'get-user-data': true
    }
};

function computeTarget(context, source) {
        var targetInputs = {
            'get-user-data$f$token': source['token']
        },
        query;
    query = target.targetChain;
    return url.format({pathname: 'get-user-data', query: merge(query, targetInputs)})
};

computeTarget.id = 'on-login-success';

module.exports = computeTarget;
