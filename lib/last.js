'use strict';
//dependencies
var path = require('path');

//import last deferred
var Deferred = require(path.join(__dirname, 'utils', 'lastDeferred'));

/**
 * @function
 * @description Find the last record (or last N records if a parameter is supplied)
 * @param  {Object} model          a valid sails model
 */
module.exports = function(model) {

    /**
     * @function
     * @description Find the last record (or last N records if a parameter is supplied)
     * @param  {Integer}   howMany  Number of records required. If not provided
     *                              default to 1.
     * @param  {Function} callback  A callback to be invoked on result
     */
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
        var deferred = new Deferred(model, model.find, {});

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
