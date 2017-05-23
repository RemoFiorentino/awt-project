/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'account-edit-view': true
       ,'account-edit-form': true
    }
};

function computeTarget(context, source) {
    var query;
    query = merge(context.elements['account-edit-view'].toQuery(target), target.targetChain);
    return  url.format({pathname: 'account-edit-view', query: query})
};

computeTarget.id = 'on-account-edit-success';

module.exports = computeTarget;
