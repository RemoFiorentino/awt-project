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
    // parameters['image']
    // parameters['name']
    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    console.log('send-image-upload-data');
    solve({
        event: 'on-image-upload-failure',
        // event: 'on-image-upload-success',
        data: {
            'location': '0',
        }
    });
    // THIS CAN BE REMOVED (END)
}

var events = {
    'on-image-upload-failure': require('./on-image-upload-failure'),
    'on-image-upload-success': require('./on-image-upload-success'),
}

exports.createAction = function (options) {
    var action = new Action(options);
    return function (context, req) {
        return new Promise(function (solve, reject) {
            var parameters = {
                'image': req.body['send-image-upload-data$f$image'],
                'name': req.body['send-image-upload-data$f$name'],
            };
            action.run(parameters, solve, reject);
        }).then(function (result) {
            return events[result.event](context, result.data);
        });
    };
};
