/*jslint node: true */
"use strict";

var express = require('express');

exports.createRouter = function (options) {
    var router = express.Router(),
        createViewModel = options.viewModels['image-upload-view'];
    router.get('/', function (req, res, next) {
        var vm = createViewModel(req);
        vm.compute()
            .then(function () {
                res.render('image-upload-view', {vm: vm.toObject() });
            })
            .catch(next);
    });
    return router;
};
