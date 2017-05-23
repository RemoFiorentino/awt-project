/*jslint node: true */
"use strict";

var Promise = require('bluebird');

exports.createInitializer = function (options) {
    var repository = options.repositories['tasks'];

    function ViewModel(context, req) {
        if (!(this instanceof ViewModel)) { return new ViewModel(context, req); }
        this.context = context;
        this.filters = {};
        if (req.query[this.id]) {
            this.selected = req.query[this.id];
        }
        this.status = 'ready';
    };

    ViewModel.prototype.id = 'campaign-worker-list';
    ViewModel.prototype.fields = {
        id: 1
        ,'accepted': 1
        ,'annotated': 1
        ,'available': 1
        ,'rejected': 1
        ,'type': 1
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
              this.context.elements['d6e0104f-642c-4a06-93db-067fb0ba1543'].compute()
              ,this.context.elements['go-to-image-selection'].compute()
              ,this.context.elements['go-to-image-annotation'].compute()
            ])
            .then(compute);
        } else {
        return this.computing = Promise.all([
          this.context.elements['d6e0104f-642c-4a06-93db-067fb0ba1543'].compute()
          ,this.context.elements['go-to-image-selection'].compute()
          ,this.context.elements['go-to-image-annotation'].compute()
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
