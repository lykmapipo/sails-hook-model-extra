'use strict';
//dependencies
var util = require("util");

//import sails waterline Deferred
var Deferred = require('sails/node_modules/waterline/lib/waterline/query/deferred');

//create a countAndFind deferred 
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


//override exec to allow
//to run both count and find queries 
//using same criteria
ExtraDeferred.prototype.exec = function(callback) {
    var me = this;

    if (!callback) {
        console.log(new Error('Error: No Callback supplied, you must define a callback.').message);
        return;
    }

    var normalize = require('sails/node_modules/waterline/lib/waterline/utils/normalize');

    // Normalize callback/switchback
    callback = normalize.callback(callback);

    //run count and find
    //parallel
    async
        .parallel({
                count: function(done) {
                    //count records using criteria
                    me._context
                        .count(me._criteria).exec(done);
                },
                data: function(done) {
                    //find records using criteria
                    me._method.call(me._context, me._criteria, done);
                }
            },
            function(error, results) {
                //back off on error
                if (error) {
                    callback(error);
                }

                //return result in form
                //{count:dataCount, data:[..found records...]}
                else {
                    //TODO what should we do if data is undefined? 
                    callback(null, results);
                }
            });
};

//export extra deferred
module.exports = ExtraDeferred;
