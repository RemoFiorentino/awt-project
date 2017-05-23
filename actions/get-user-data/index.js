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
    // parameters['token']
    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    console.log('get-user-data');
    solve({
        event: 'redirect-to-manager-view',
        // event: 'go-to-worker-view',
        data: {
            'fullname': '0',
            'type': '0',
            'username': '0',
        }
    });
    // THIS CAN BE REMOVED (END)
}

var events = {
    'redirect-to-manager-view': require('./redirect-to-manager-view'),
    'go-to-worker-view': require('./go-to-worker-view'),
}

exports.createAction = function (options) {
    var action = new Action(options);
    return function (context, req) {
        return new Promise(function (solve, reject) {
            var parameters = {
                'token': req.body['get-user-data$f$token'],
            };
            action.run(parameters, solve, reject);
        }).then(function (result) {
            return events[result.event](context, result.data);
        });
    };
};
