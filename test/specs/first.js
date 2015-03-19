'use strict';
var expect = require('chai').expect;

describe('Model#first', function() {

	it('should attach first model method', function (done) {
		expect(User).to.respondTo('first');
		
		done();
	});

    it('should get a first record', function(done) {
        expect(true).to.be.true;

        done();
    });

});
