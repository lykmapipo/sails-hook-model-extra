'use strict';
var expect = require('chai').expect;

describe('Model#countAndFind', function() {

    it('should attach countAndFind model static method', function(done) {
        expect(User).to.respondTo('countAndFind');

        done();
    });


    it('should able to count and find all records with no criteria using callback model API', function(done) {

        User
            .countAndFind(function(error, results) {
                if (error) {
                    done(error);
                } else {
                    expect(results.count).to.exist;
                    expect(results.data).to.exist;

                    expect(results.count).to.be.equal(10);
                    expect(results.data.length).to.be.equal(10);

                    done();
                }
            });
    });


    it('should able to count and find all records with criteria using callback model API', function(done) {

        User
            .countAndFind({
                id: {
                    '>': 2
                }
            }, function(error, results) {
                if (error) {
                    done(error);
                } else {

                    expect(results.count).to.exist;
                    expect(results.data).to.exist;

                    expect(results.count).to.be.equal(8);
                    expect(results.data.length).to.be.equal(8);

                    done();
                }
            });
    });


    it('should able to count and find all records with no criteria using deferred model API', function(done) {

        User
            .countAndFind()
            .exec(function(error, results) {
                if (error) {
                    done(error);
                } else {
                    expect(results.count).to.exist;
                    expect(results.data).to.exist;

                    expect(results.count).to.be.equal(10);
                    expect(results.data.length).to.be.equal(10);

                    done();
                }
            });
    });


    it('should able to count and find all records with criteria using deferred model API', function(done) {

        User
            .countAndFind({
                id: {
                    '>': 2
                }
            })
            .exec(function(error, results) {
                if (error) {
                    done(error);
                } else {

                    expect(results.count).to.exist;
                    expect(results.data).to.exist;

                    expect(results.count).to.be.equal(8);
                    expect(results.data.length).to.be.equal(8);

                    done();
                }
            });
    });



    it('should able to count and find all records with no criteria using promise model API', function(done) {

        User
            .countAndFind()
            .then(function(results) {

                expect(results.count).to.exist;
                expect(results.data).to.exist;

                expect(results.count).to.be.equal(10);
                expect(results.data.length).to.be.equal(10);

                done();
            })
            .catch(function(error) {
                done(error);
            });
    });


    it('should able to count and find all records with criteria using promise model API', function(done) {

        User
            .countAndFind({
                id: {
                    '>': 2
                }
            })
            .then(function(results) {

                expect(results.count).to.exist;
                expect(results.data).to.exist;

                expect(results.count).to.be.equal(8);
                expect(results.data.length).to.be.equal(8);

                done();
            })
            .catch(function(error) {
                done(error);
            });
    });

});
