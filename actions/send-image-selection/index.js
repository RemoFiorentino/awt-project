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
    // parameters['accepted']
    // TODO: Execution
    /*
    example:
    mail.find({subject: 'Re: ' + data.subject})
        .then(solve);
    */
    // THIS CAN BE REMOVED (BEGIN)
    console.log('send-image-selection');
    solve({
        event: 'on-more-image-to-selected',
        // event: 'on-no-more-images-to-select',
        data: {
        }
    });
    // THIS CAN BE REMOVED (END)
}

var events = {
    'on-more-image-to-selected': require('./on-more-image-to-selected'),
    'on-no-more-images-to-select': require('./on-no-more-images-to-select'),
}

exports.createAction = function (options) {
    var action = new Action(options);
    return function (context, req) {
        return new Promise(function (solve, reject) {
            var parameters = {
                'accepted': req.body['send-image-selection$f$accepted'],
            };
            action.run(parameters, solve, reject);
        }).then(function (result) {
            return events[result.event](context, result.data);
        });
    };
};
