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
    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    console.log('send-create-campaign-data');
    solve({
        event: 'on-create-campaign-failure',
        // event: 'on-create-campaign-success',
        data: {
            'Location': '0',
        }
    });
    // THIS CAN BE REMOVED (END)
}

var events = {
    'on-create-campaign-failure': require('./on-create-campaign-failure'),
    'on-create-campaign-success': require('./on-create-campaign-success'),
}

exports.createAction = function (options) {
    var action = new Action(options);
    return function (context, req) {
        return new Promise(function (solve, reject) {
            var parameters = {
                'annotation_replica': req.body['send-create-campaign-data$f$annotation_replica'],
                'annotation_size': req.body['send-create-campaign-data$f$annotation_size'],
                'name': req.body['send-create-campaign-data$f$name'],
                'selection_replica': req.body['send-create-campaign-data$f$selection_replica'],
                'threshold': req.body['send-create-campaign-data$f$threshold'],
            };
            action.run(parameters, solve, reject);
        }).then(function (result) {
            return events[result.event](context, result.data);
        });
    };
};
