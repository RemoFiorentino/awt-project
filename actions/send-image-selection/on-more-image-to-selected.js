/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'image-selection-form': true
    }
};

function computeTarget(context, source) {
    var query;
    query = merge(context.elements['image-selection'].toQuery(target), target.targetChain);
    return  url.format({pathname: 'image-selection', query: query})
};

computeTarget.id = 'on-more-image-to-selected';

module.exports = computeTarget;
