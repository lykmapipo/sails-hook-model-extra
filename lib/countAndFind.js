'use strict';

/**
 * @function
 * @description count and find records based or criteria specified
 * @param  {Object} model          a valid sails model
 */
module.exports = function(model) {

    function countAndFind(criteria, callback) {};

    //attach countAndFind
    //to the model
    model.countAndFind = countAndFind;
}
