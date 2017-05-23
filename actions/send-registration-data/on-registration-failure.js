/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'register-form': true
    }
};

function computeTarget(context, source) {
    var query;
    query = merge(context.elements['register-view'].toQuery(target), target.targetChain);
    return  url.format({pathname: 'register-view', query: query})
};

computeTarget.id = 'on-registration-failure';

module.exports = computeTarget;
