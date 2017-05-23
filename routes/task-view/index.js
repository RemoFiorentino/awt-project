/*jslint node: true */
"use strict";

var express = require('express');

exports.createRouter = function (options) {
    var router = express.Router(),
        createViewModel = options.viewModels['task-view'];
    router.get('/', function (req, res, next) {
        var vm = createViewModel(req);
        vm.compute()
            .then(function () {
                res.render('task-view', {vm: vm.toObject() });
            })
            .catch(next);
    });
    return router;
};
