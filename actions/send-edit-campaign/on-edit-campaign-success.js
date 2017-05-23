/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'edit-campaign-view': true
       ,'edit-campaign-form': true
    }
};

function computeTarget(context, source) {
    var query;
    query = merge(context.elements['edit-campaign-view'].toQuery(target), target.targetChain);
    return  url.format({pathname: 'edit-campaign-view', query: query})
};

computeTarget.id = 'on-edit-campaign-success';

module.exports = computeTarget;
