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
    // parameters['account-type']
    // parameters['fullname']
    // parameters['password']
    // parameters['username']
    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    console.log('send-registration-data');
    solve({
        event: 'on-registration-failure',
        // event: 'on-registration-success',
        data: {
            'token': '0',
        }
    });
    // THIS CAN BE REMOVED (END)
}

var events = {
    'on-registration-failure': require('./on-registration-failure'),
    'on-registration-success': require('./on-registration-success'),
}

exports.createAction = function (options) {
    var action = new Action(options);
    return function (context, req) {
        return new Promise(function (solve, reject) {
            var parameters = {
                'account-type': req.body['send-registration-data$f$account-type'],
                'fullname': req.body['send-registration-data$f$fullname'],
                'password': req.body['send-registration-data$f$password'],
                'username': req.body['send-registration-data$f$username'],
            };
            action.run(parameters, solve, reject);
        }).then(function (result) {
            return events[result.event](context, result.data);
        });
    };
};
