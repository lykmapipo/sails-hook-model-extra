'use strict';

/**
 * @function
 * @description Allow to soft delete of a model by set deletedAt 
 *              to current timestamp
 * @param  {Object} model          a valid sails model
 */
module.exports = function(model) {
    /**
     * @description soft delete a model by set deletedAt to current timestamp
     * @param  {Object}   criteria	A criteria to use on soft delete a model(s)
     * @param  {Function} callback	A callback to be invoked on result
     */
    function softDelete(criteria, callback) {
        //check if criteria provided
        //default to `{}` if not explicit provided
        if (criteria && !_.isPlainObject(criteria)) {
            callback = criteria;
            criteria = {};
        }

        //we are not sure if callback 
        //was provided too
        else {
            criteria = criteria || {};
        }

        //set deletedAt timestamp
        var deletedAt = {
            deletedAt: new Date()
        }

        //if callback provided
        //execute the query
        if (_.isFunction(callback)) {
            return model.update(criteria, deletedAt).exec(callback);
        }

        //otherwise return the deferred object
        else {
            return model.update(criteria, deletedAt);
        }
    };

    //attach softDelete
    //to model
    model.softDelete = softDelete;
};
