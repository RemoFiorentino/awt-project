/*jslint node: true */
"use strict";

var Promise = require('bluebird');

exports.createInitializer = function (options) {
    var items = [
        require('./worker-select-view').createInitializer(options)
        ,require('./list-available-workers').createInitializer(options)
        ,require('./list-available-annotator').createInitializer(options)
        ,require('./selector-list').createInitializer(options)
        ,require('./annotator-list').createInitializer(options)
        ,require('./go-manager-campaign').createInitializer(options)
        ,require('./2c13eb15-2680-4393-a576-b5f2cc847b95').createInitializer(options)
        ,require('./d80e9591-d019-4eb7-b1f3-205377663d62').createInitializer(options)
        ,require('./03d30503-ed92-45f0-95f5-f45ffa682858').createInitializer(options)
        ,require('./2cfceb3a-afad-4055-8a88-f3fd11538e0c').createInitializer(options)
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

    ViewModel.prototype.main = 'worker-select-view';

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
