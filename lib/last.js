'use strict';

/**
 * @function
 * @description get last n records from a model
 * @param  {Object} model          a valid sails model
 */
module.exports = function(model) {

    function last(howMany, callback) {};

    //attach last
    //to the model
    model.last = last;
}
