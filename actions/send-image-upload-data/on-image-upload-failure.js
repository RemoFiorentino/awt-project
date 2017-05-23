/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'image-upload-form': true
    }
};

function computeTarget(context, source) {
    var query;
    query = merge(context.elements['image-upload-view'].toQuery(target), target.targetChain);
    return  url.format({pathname: 'image-upload-view', query: query})
};

computeTarget.id = 'on-image-upload-failure';

module.exports = computeTarget;
