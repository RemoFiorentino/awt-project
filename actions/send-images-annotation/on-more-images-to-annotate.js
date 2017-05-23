/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'image-annotation-form': true
    }
};

function computeTarget(context, source) {
    var query;
    query = merge(context.elements['image-annotation'].toQuery(target), target.targetChain);
    return  url.format({pathname: 'image-annotation', query: query})
};

computeTarget.id = 'on-more-images-to-annotate';

module.exports = computeTarget;
