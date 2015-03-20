'use strict';

var path = require('path');

//import extra deferred
var Deferred = require(path.join(__dirname, 'utils', 'countAndFindDeferred'));

/**
 * @function
 * @description count and find records based or criteria specified
 * @param  {Object} model          a valid sails model
 */
module.exports = function(model) {

    function countAndFind(criteria, callback) {
        //check if criteria provided
        //default to {} if not explicit provided
        if (criteria && !_.isPlainObject(criteria)) {
            callback = criteria;
            criteria = {};
        }
        //we are not sure if callback 
        //was provided too
        else {
            criteria = criteria || {};
        }

        //create model.countAndFind() deferrred object
        //with model.find() as query method 
        //and use current criteria
        var deferred = new Deferred(model, model.find, criteria);

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

    //attach countAndFind
    //to the model
    model.countAndFind = countAndFind;
}
