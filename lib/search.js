'use strict';
/**
 * @function
 * @description Perform free search on record(s) using like criteria modifier on
 *              model attributes
 *              Warning!: Using this type of search directly when dataset is 
 *              few hundreds otherwise consider using search with pagination
 * @param  {Object} model          a valid sails model
 */
module.exports = function(model) {

    /**
     * @function
     * @description Perform free search on record(s) using like criteria modifier
     * @param  {String}   searchTerm A search term to match agaist record(s)
     * @param  {Function} callback  A callback to be invoked on result
     */
    function search(searchTerm, callback) {
        //check if search term provided
        //default to undefined if not explicit provided
        if (searchTerm && !_.isString(searchTerm)) {
            callback = searchTerm;
            searchTerm = undefined;
        }

        //using OR criteria to perfom search
        var criterias = {
            or: []
        };

        //prepare types of model attributes 
        //where search can be performed on
        var searchableTypes =
            model.searchableTypes || [
                'string', 'text', 'integer',
                'float', 'json', 'email'
            ];

        //if search term is provided
        //build criterias
        if (searchTerm) {
            //using model attributes to build search query
            _(model.attributes)
                .forEach(function(attributeDefinition, attributeName) {
                    // check if attribute type is within searchable types
                    var isSearchable =
                        _.indexOf(searchableTypes, attributeDefinition.type) >= 0;

                    if (isSearchable) {
                        //create  attribute contains criteria
                        var criteria = {};
                        criteria[attributeName] = {
                            'contains': searchTerm
                        };

                        // push attribute criteria on criterias
                        criterias.or.push(criteria);
                    }
                });
        }

        //otherwise no search term provided 
        //then use empty criterias
        else {
            criterias = {};
        }

        //build a find query using criterias 
        var query = model.find(criterias);

        //if callback provided
        //execute the query
        if (_.isFunction(callback)) {
            return query.exec(callback);
        }

        //otherwise return the deferred object
        else {
            return query;
        }
    };

    //attach search
    //to the model
    model.search = search;
}
