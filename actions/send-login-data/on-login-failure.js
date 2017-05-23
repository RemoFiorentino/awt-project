/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'login-form': true
    }
};

function computeTarget(context, source) {
    var query;
    query = merge(context.elements['login-view'].toQuery(target), target.targetChain);
    return  url.format({pathname: 'login-view', query: query})
};

computeTarget.id = 'on-login-failure';

module.exports = computeTarget;
