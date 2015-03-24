'use strict';
var expect = require('chai').expect;
var faker = require('faker');

describe('Model#search', function() {

    it('should be able to attach countAndSearch as model method', function(done) {
        expect(User).to.respondTo('countAndSearch');
        done();
    });

    it('should be able to run as countAndFind() when no searchTerm provided', function(done) {
        User
            .countAndSearch(function(error, results) {
                if (error) {
                    done(error);
                } else {
                    expect(results.count).to.be.equal(10);
                    done();
                }
            });
    });


    it('should be able to count hits and search for records using model callback API', function(done) {
        User
            .countAndSearch('gmail', function(error, results) {
                if (error) {
                    done(error)
                } else {
                    expect(results.count).to.be.equal(4);

                    expect(_.map(results.data, 'username'))
                        .to.include.members(['Trent Marvin', 'Malika Greenfelder']);

                    done();
                }
            });
    });


    it('should be able to count hits and search for records using model deferred API', function(done) {
        User
            .countAndSearch('vi')
            .exec(function(error, results) {
                if (error) {
                    done(error);
                } else {
                    expect(results.count).to.be.equal(4);

                    expect(_.map(results.data, 'username'))
                        .to
                        .include
                        .members(['Trent Marvin', 'Viva Gaylord', 'Victoria Steuber']);

                    expect(_.map(results.data, 'email'))
                        .to
                        .include
                        .members(['vicky2@gmail.com']);

                    done();
                }
            });
    });


    it('should be able to count hits and search for records using model promise API', function(done) {
        User
            .countAndSearch('Malika')
            .then(function(results) {
                expect(results.count).to.be.equal(1);

                expect(results.data[0].username).to.be.equal('Malika Greenfelder');
                expect(results.data[0].email).to.be.equal('kory.dooley@gmail.com');

                done();
            })
            .catch(function(error) {
                done(error);
            });
    });

});
