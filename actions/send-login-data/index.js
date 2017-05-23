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
    // parameters['password']
    // parameters['username']
    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    console.log('send-login-data');
    solve({
        event: 'on-login-success',
        // event: 'on-login-failure',
        data: {
            'token': '0',
        }
    });
    // THIS CAN BE REMOVED (END)
}

var events = {
    'on-login-success': require('./on-login-success'),
    'on-login-failure': require('./on-login-failure'),
}

exports.createAction = function (options) {
    var action = new Action(options);
    return function (context, req) {
        return new Promise(function (solve, reject) {
            var parameters = {
                'password': req.body['send-login-data$f$password'],
                'username': req.body['send-login-data$f$username'],
            };
            action.run(parameters, solve, reject);
        }).then(function (result) {
            return events[result.event](context, result.data);
        });
    };
};
