/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'image-upload-view': true
       ,'image-upload-form': true
    }
};

function computeTarget(context, source) {
    var query;
    query = target.targetChain;
    return  url.format({pathname: 'image-upload-view', query: query})
};

computeTarget.id = 'on-create-campaign-success';

module.exports = computeTarget;
