/*jslint node: true */
"use strict";

var Promise = require('bluebird');

exports.createInitializer = function (options) {
    var items = [
        require('./image-annotation').createInitializer(options)
        ,require('./image-annotation-form').createInitializer(options)
        ,require('./on-image-annotation-submit').createInitializer(options)
    ];
    function ViewModel(req) {
        if (!(this instanceof ViewModel)) { return new ViewModel(req); }
        var self = this;
        this.elements = {};
        items.forEach(function (item) {
            var element = item(self, req);
            self.elements[element.id] = element;
        });
    }

    ViewModel.prototype.main = 'image-annotation';

    ViewModel.prototype.compute = function () {
        return this.elements[this.main].compute();
    };

    ViewModel.prototype.toObject = function () {
        var self = this,
            json = {};
        Object.keys(this.elements).forEach(function (id) {
            json[id] = self.elements[id].toObject();
        });
        return json;
    };

    return ViewModel;
};
