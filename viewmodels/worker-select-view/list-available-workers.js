/*jslint node: true */
"use strict";

var Promise = require('bluebird');

exports.createInitializer = function (options) {
    var repository = options.repositories['workers'];

    function ViewModel(context, req) {
        if (!(this instanceof ViewModel)) { return new ViewModel(context, req); }
        this.context = context;
        this.filters = {};
        if (req.query[this.id]) {
            this.selected = req.query[this.id];
        }
        this.status = 'ready';
        if (req.query[this.id + '$f$selector']) {
            this.filters['selector'] = req.query[this.id + '$f$selector'];
        }
    };

    ViewModel.prototype.id = 'list-available-workers';
    ViewModel.prototype.fields = {
        id: 1
        ,'fullname': 1
        ,'id': 1
    };

    ViewModel.prototype.compute = function () {
        if (this.computing) { return this.computing; }
        var self = this;
        function compute() {
            return repository.find(self.filters, self.fields)
                .then(function (items) {
                    self.items = items;
                    var id = self.selected;
                    self.selected = undefined;
                    if (id) {
                        items.forEach(function (item) {
                            if (item.id === id) {
                                self.selected = item;
                            }
                        });
                    }
                    if (!self.selected && items.length) {
                        self.selected = items[0];
                    }
                    self.status = 'computed';
                    self.computed = true;
                });
        }
        if (this.status === 'clear') {
            return this.computing = Promise.all([
              this.context.elements['2c13eb15-2680-4393-a576-b5f2cc847b95'].compute()
            ])
            .then(compute);
        } else {
        return this.computing = Promise.all([
          this.context.elements['2c13eb15-2680-4393-a576-b5f2cc847b95'].compute()
        ])
        .then(compute);
        }
    };

    ViewModel.prototype.toObject = function () {
        if (!this.computed) { return; }
        return {items: this.items, selected: this.selected};
    };

    ViewModel.prototype.toQuery = function (event) {
        var self = this,
            query = {};
        if (!event.broken[this.id]) {
            Object.keys(this.filters).forEach(function (filter) {
                if (self.filters[filter]) {
                    query[self.id + '$f$' + filter] = self.filters[filter];
                }
            });
            query[this.id] = this.selected ? this.selected.id : '';
        }
        return query;
    };

    return ViewModel;
};
