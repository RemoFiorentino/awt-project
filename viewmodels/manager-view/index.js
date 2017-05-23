/*jslint node: true */
"use strict";

var Promise = require('bluebird');

exports.createInitializer = function (options) {
    var items = [
        require('./manager-view').createInitializer(options)
        ,require('./list-campaign').createInitializer(options)
        ,require('./create-campaign-btn-pressed').createInitializer(options)
        ,require('./go-edit-campaign').createInitializer(options)
        ,require('./change-state-campaign').createInitializer(options)
        ,require('./496ca6e1-d56b-4d3d-9567-ca80fbeeb9e5').createInitializer(options)
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

    ViewModel.prototype.main = 'manager-view';

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
