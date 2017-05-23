/*jslint node: true */
"use strict";

var express = require('express'),
    bodyParser = require('body-parser');

exports.createRouter = function (options) {
    var router = express.Router(),
        action = options.actions['send-account-edit-data'],
        createViewModel = options.viewModels['account-edit-view'];
    router.post('/', bodyParser.urlencoded(), function (req, res, next) {
        var vm = createViewModel(req);
        vm.compute()
            .then(function () {
                return action(vm, req);
            })
            .then(function (target) {
                console.log(target);
                res.redirect(303, target);
            })
            .catch(next);
    });
    return router;
};
