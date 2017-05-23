/*jslint node: true */
"use strict";

var Promise = require('bluebird');

exports.createInitializer = function (options) {
    var items = [
        require('./ea4a1cfc-6db0-4261-b2b9-e7474943e47a').createInitializer(options)
        ,require('./campaign-worker-list').createInitializer(options)
        ,require('./d6e0104f-642c-4a06-93db-067fb0ba1543').createInitializer(options)
        ,require('./go-to-image-selection').createInitializer(options)
        ,require('./go-to-image-annotation').createInitializer(options)
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

    ViewModel.prototype.main = 'ea4a1cfc-6db0-4261-b2b9-e7474943e47a';

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
