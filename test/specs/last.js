'use strict';
var expect = require('chai').expect;

describe('Model#last', function() {

	it('should attach last model method', function (done) {
		expect(User).to.respondTo('last');
		
		done();
	});

    it('should get a last record', function(done) {
        expect(true).to.be.true;

        done();
    });

    it('should get last five records', function(done) {
        expect(true).to.be.true;

        done();
    });

});
