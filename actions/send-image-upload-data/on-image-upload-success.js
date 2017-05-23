/*jslint node: true */
"use strict";

var url = require('url'),
    merge = require('merge');

var target = {
    targetChain: {
    },
    broken: {
       'worker-select-view': true
       ,'list-available-workers': true
       ,'list-available-annotator': true
       ,'selector-list': true
       ,'annotator-list': true
    }
};

function computeTarget(context, source) {
    var query;
    query = target.targetChain;
    return  url.format({pathname: 'worker-select-view', query: query})
};

computeTarget.id = 'on-image-upload-success';

module.exports = computeTarget;
