/*jslint node: true */
"use strict";

var express = require('express');

exports.createRouter = function (options) {
    var router = express.Router(),
        createViewModel = options.viewModels['ea4a1cfc-6db0-4261-b2b9-e7474943e47a'];
    router.get('/', function (req, res, next) {
        var vm = createViewModel(req);
        vm.compute()
            .then(function () {
                res.render('ea4a1cfc-6db0-4261-b2b9-e7474943e47a', {vm: vm.toObject() });
            })
            .catch(next);
    });
    return router;
};
