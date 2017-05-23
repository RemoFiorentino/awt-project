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
    // parameters['fullname']
    // parameters['password']
    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    console.log('send-account-edit-data');
    solve({
        event: 'on-account-edit-failure',
        // event: 'on-account-edit-success',
        data: {
            'token': '0',
        }
    });
    // THIS CAN BE REMOVED (END)
}

var events = {
    'on-account-edit-failure': require('./on-account-edit-failure'),
    'on-account-edit-success': require('./on-account-edit-success'),
}

exports.createAction = function (options) {
    var action = new Action(options);
    return function (context, req) {
        return new Promise(function (solve, reject) {
            var parameters = {
                'fullname': req.body['send-account-edit-data$f$fullname'],
                'password': req.body['send-account-edit-data$f$password'],
            };
            action.run(parameters, solve, reject);
        }).then(function (result) {
            return events[result.event](context, result.data);
        });
    };
};
