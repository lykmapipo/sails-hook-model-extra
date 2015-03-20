'use strict';
//dependencies
var util = require("util");

//import sails waterline Deferred
var Deferred = require('sails/node_modules/waterline/lib/waterline/query/deferred');

//create a last deferred 
// which inherit from sails waterline deferred
// to allow easy queries constructions
var ExtraDeferred = function(context, method, criteria, values) {

    if (!context) return new Error('Must supply a context to a new Deferred object. Usage: new Deferred(context, method, criteria)');
    if (!method) return new Error('Must supply a method to a new Deferred object. Usage: new Deferred(context, method, criteria)');

    this._context = context;
    this._method = method;
    this._criteria = criteria;
    this._values = values || null;

    this._deferred = null; // deferred object for promises

    return this;

};

//inherit sails deferred
util.inherits(ExtraDeferred, Deferred);

//keep reference of how many
//records required before apply it
//to criteria
ExtraDeferred.prototype.howMany = 1;

//override exec to allow
//to run both count and find using
//same criteria
ExtraDeferred.prototype.exec = function(callback) {
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
                callback(error);
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



//export extra deferred
module.exports = ExtraDeferred;
