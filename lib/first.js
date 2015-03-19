'use strict';

/**
 * @function
 * @description get first n records from a model
 * @param  {Object} model          a valid sails model
 */
module.exports = function(model) {

    function first(howMany, callback) {};

    //attach countAndFind
    //to the model
    model.first = first;
}
