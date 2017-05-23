/*jslint node: true */
"use strict";

var Promise = require('bluebird');

function Action(options) {
    // TODO: Global Initialization
    /*
    example:
    this.collection = options.repositories.mail;
    */
}

Action.prototype.run = function(parameters, solve, reject) {
    // Parameters
    // parameters['annotation_replica']
    // parameters['annotation_size']
    // parameters['name']
    // parameters['selection_replica']
    // parameters['threshold']
    // parameters['url']
    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    console.log('send-edit-campaign');
    solve({
        event: 'on-edit-campaign-success',
        // event: 'on-edit-campaign-failure',
        data: {
        }
    });
    // THIS CAN BE REMOVED (END)
}

var events = {
    'on-edit-campaign-success': require('./on-edit-campaign-success'),
    'on-edit-campaign-failure': require('./on-edit-campaign-failure'),
}

exports.createAction = function (options) {
    var action = new Action(options);
    return function (context, req) {
        return new Promise(function (solve, reject) {
            var parameters = {
                'annotation_replica': req.body['send-edit-campaign$f$annotation_replica'],
                'annotation_size': req.body['send-edit-campaign$f$annotation_size'],
                'name': req.body['send-edit-campaign$f$name'],
                'selection_replica': req.body['send-edit-campaign$f$selection_replica'],
                'threshold': req.body['send-edit-campaign$f$threshold'],
                'url': req.body['send-edit-campaign$f$url'],
            };
            action.run(parameters, solve, reject);
        }).then(function (result) {
            return events[result.event](context, result.data);
        });
    };
};
