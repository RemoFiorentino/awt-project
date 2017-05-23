/*jslint node: true */
"use strict";

var Promise = require('bluebird');

exports.createInitializer = function (options) {
    function ViewModel(context, req) {
        if (!(this instanceof ViewModel)) { return new ViewModel(context, req); }
        this.context = context;
        this.fields = {};
        this.status = 'ready';
        this.fields['annotation_replica'] = req.query[this.id + '$f$annotation_replica'] || '';
        this.fields['annotation_size'] = req.query[this.id + '$f$annotation_size'] || '';
        this.fields['name'] = req.query[this.id + '$f$name'] || '';
        this.fields['selection_replica'] = req.query[this.id + '$f$selection_replica'] || '';
        this.fields['threshold'] = req.query[this.id + '$f$threshold'] || '';
    };

    ViewModel.prototype.id = 'edit-campaign-form';

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
              this.context.elements['7d7aa24d-b606-4a4d-95b6-e026635228e0'].compute()
            ])
            .then(compute);
        } else {
        return this.computing = Promise.all([
          this.context.elements['7d7aa24d-b606-4a4d-95b6-e026635228e0'].compute()
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
