'use strict';
var expect = require('chai').expect;
var faker = require('faker');

describe('Model#search', function() {

    it('should be able to attach search as model method', function(done) {
        expect(User).to.respondTo('search');
        done();
    });

});
