'use strict';

/**
 * @function
 * @description Perform free search on record(s) using like criteria modifier
 * @param  {Object} model          a valid sails model
 */
module.exports = function(model) {

    /**
     * @function
     * @description Perform free search on record(s) using like criteria modifier
     * @param  {searchQuery}   searchQuery A search term to match agaist record(s)
     * @param  {Function} callback  A callback to be invoked on result
     */
    function search(searchQuery, callback) {

    };

    //attach search
    //to the model
    model.search = search;
}
