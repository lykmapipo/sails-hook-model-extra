'use strict';
//dependencies
var path = require('path');
var libPath = path.join(__dirname, 'lib');

//model extras
var countAndFind = require(path.join(libPath, 'countAndFind'));
var countAndSearch = require(path.join(libPath, 'countAndSearch'));
var first = require(path.join(libPath, 'first'));
var last = require(path.join(libPath, 'last'));
var search = require(path.join(libPath, 'search'));
var softDelete = require(path.join(libPath, 'softDelete'));

/**
 * @function
 * @description additional methods for sails model
 * @param  {Object} sails a sails application instance
 */
module.exports = function(sails) {
    return {
        initialize: function(done) {
            //first
            //
            //patching models to add additional required attributes
            sails
                .after(['hook:moduleloader:loaded'], function() {
                    patchAttributes();
                });

            //later on wait for this events
            //to apply extra methods to models
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

                //bind model additional methods
                //on concrete models
                //and left derived model
                //build from associations
                if (model.globalId) {
                    countAndFind(model);
                    countAndSearch(model);
                    first(model);
                    last(model);
                    search(model);
                    softDelete(model);
                }
            });
    };

    //extend model attributes
    //with deletedAt attribute
    function patchAttributes() {
        _(sails.models)
            .forEach(function(model) {
                //bind deleteAt attributes into
                //model attributes if not explicit defined
                if (!model.attributes.deletedAt) {
                    _.extend(model.attributes, {
                        deletedAt: {
                            type: 'datetime',
                            defaultsTo:null
                        }
                    });
                }
            });
    }

};
