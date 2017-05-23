/*jslint node: true */
"use strict";

var Promise = require('bluebird');

exports.createInitializer = function (options) {
    function ViewModel(context, req) {
        if (!(this instanceof ViewModel)) { return new ViewModel(context, req); }
        this.context = context;
        this.fields = {};
        this.status = 'ready';
        this.fields['annotation'] = req.query[this.id + '$f$annotation'] || '';
    };

    ViewModel.prototype.id = 'image-annotation-form';

    ViewModel.prototype.compute = function () {
        if (this.computing) { return this.computing; }
        var self = this;
        function compute() {
            self.status = 'computed';
            self.computed = true;
            return Promise.resolve();
        }
        if (this.status === 'clear') {
            return this.computing = Promise.all([
              this.context.elements['on-image-annotation-submit'].compute()
            ])
            .then(compute);
        } else {
        return this.computing = Promise.all([
          this.context.elements['on-image-annotation-submit'].compute()
        ])
        .then(compute);
        }
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        return {fields: this.fields};
    };

    ViewModel.prototype.toQuery = function (event) {
        var self = this,
            query = {};
        if (!event.broken[this.id]) {
            Object.keys(this.fields).forEach(function (field) {
                if (self.fields[field]) {
                    query[self.id + '$f$' + field] = self.fields[field];
                }
            });
            query[this.id] = '';
        }
        return query;
    };

    return ViewModel;
};
