'use strict';

var util = require("util");

//import sails waterline Deferred
var Deferred = require('sails/node_modules/waterline/lib/waterline/query/deferred');

//create a extra deferred 
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


//export extra deferred
module.exports = ExtraDeferred;
