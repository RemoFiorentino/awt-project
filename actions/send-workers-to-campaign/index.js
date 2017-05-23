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
    // parameters['id']
    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    console.log('send-workers-to-campaign');
    solve({
        event: 'on-send-worker-success',
        data: {
        }
    });
    // THIS CAN BE REMOVED (END)
}

var events = {
    'on-send-worker-success': require('./on-send-worker-success'),
}

exports.createAction = function (options) {
    var action = new Action(options);
    return function (context, req) {
        return new Promise(function (solve, reject) {
            var parameters = {
                'id': req.body['send-workers-to-campaign$f$id'],
            };
            action.run(parameters, solve, reject);
        }).then(function (result) {
            return events[result.event](context, result.data);
        });
    };
};
