'use strict';
/**
 * @function
 * @description additional methods for sails model
 * @param  {Object} sails a sails application instance
 */
module.exports = function(sails) {
    return {
        initialize: function(done) {
            var eventsToWaitFor = [];

            //wait for orm 
            //and pub sub hooks
            //to be loaded
            //for additional methods to
            //be attached to models
            if (sails.hooks.orm) {
                eventsToWaitFor.push('hook:orm:loaded');
            }
            if (sails.hooks.pubsub) {
                eventsToWaitFor.push('hook:pubsub:loaded');
            }

            sails
                .after(eventsToWaitFor, function() {

                    //bind additional methods
                    //to models
                    //and let sails to continue
                    patch();

                    done();
                });
        }
    };

    //patch sails model
    //to add extra methods
    function patch() {
        _(sails.models)
            .forEach(function(model) {
                //bind path validate
                //on concrete models
                //and left derived model
                //build from associations
                if (model.globalId) {

                }
            });
    };


};
