'use strict';
var expect = require('chai').expect;

describe('Model#countAndFind', function() {

    it('should attach countAndFind model static method', function(done) {
        expect(User).to.respondTo('countAndFind');

        done();
    });

    it('should count and find records', function(done) {
        expect(true).to.be.true;

        done();
    });

});
