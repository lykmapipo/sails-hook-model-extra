'use strict';
var path = require('path');

//import extra deferred
var LastDeferred = require(path.join(__dirname, 'utils', 'deferred'));

//keep reference of how many
//records required before apply it
//to criteria
LastDeferred.prototype.howMany = 1;

//override exec to allow
//to run both count and find using
//same criteria
LastDeferred.prototype.exec = function(callback) {
    var me = this;

    if (!callback) {
        console.log(new Error('Error: No Callback supplied, you must define a callback.').message);
        return;
    }

    var normalize = require('sails/node_modules/waterline/lib/waterline/utils/normalize');

    // Normalize callback/switchback
    callback = normalize.callback(callback);

    //count existing records
    //using criteria
    //
    //TODO wait fo waterline2 to be able
    //to use sub queries
    me._context
        .count(me._criteria, function(error, count) {
            //back off if count error(s) found
            if (error) {
                throw error;
                //TODO should we return undefined?
            }

            //count successfully
            //continue with selection
            else {
                //set criteria offset
                me._criteria.skip = count - me.howMany;

                //set criteria limit
                me._criteria.limit = me.howMany;

                // Pass control to the adapter with the appropriate arguments.
                me._method.call(me._context, me._criteria, callback);
            }
        });
};


/**
 * @function
 * @description get last n records from a model
 * @param  {Object} model          a valid sails model
 */
module.exports = function(model) {

    function last(howMany, callback) {
        //check how many records are needed
        //default to 1 if not explicit provided
        if (howMany && !_.isNumber(howMany)) {
            callback = howMany;
            howMany = 1;
        }
        //we are not sure if callback 
        //was provided too
        else {
            howMany = howMany || 1;
        }

        //create model.last() deferrred object
        //with model.find() as query method 
        //and use empty criteria
        var deferred = new LastDeferred(model, model.find, {});

        //set how many record needed
        deferred.howMany = howMany;

        //if callback provided
        //execute the query
        if (_.isFunction(callback)) {
            return deferred.exec(callback);
        }

        //otherwise return the deferred object
        else {
            return deferred;
        }

    };

    //attach last
    //to the model
    model.last = last;
}
