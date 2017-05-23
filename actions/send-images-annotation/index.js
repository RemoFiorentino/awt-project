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
    // parameters['annotation']
    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    console.log('send-images-annotation');
    solve({
        event: 'on-more-images-to-annotate',
        // event: 'on-no-more-images-annotate',
        data: {
        }
    });
    // THIS CAN BE REMOVED (END)
}

var events = {
    'on-more-images-to-annotate': require('./on-more-images-to-annotate'),
    'on-no-more-images-annotate': require('./on-no-more-images-annotate'),
}

exports.createAction = function (options) {
    var action = new Action(options);
    return function (context, req) {
        return new Promise(function (solve, reject) {
            var parameters = {
                'annotation': req.body['send-images-annotation$f$annotation'],
            };
            action.run(parameters, solve, reject);
        }).then(function (result) {
            return events[result.event](context, result.data);
        });
    };
};
