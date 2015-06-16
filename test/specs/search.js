'use strict';

//dependencies
var expect = require('chai').expect;

describe('Model#search', function() {

    it('should be able to attach search as model method', function(done) {
        expect(User).to.respondTo('search');
        done();
    });

    it('should be able to run as find() when no searchTerm provided', function(done) {
        User
            .search(function(error, users) {
                if (error) {
                    done(error);
                } else {
                    expect(users.length).to.be.equal(10);
                    done();
                }
            });
    });


    it('should be able to search for records using model callback API', function(done) {
        User
            .search('gmail', function(error, users) {
                if (error) {
                    done(error);
                } else {
                    expect(users.length).to.be.equal(4);

                    expect(_.map(users, 'username'))
                        .to.include.members(['Trent Marvin', 'Malika Greenfelder']);

                    done();
                }
            });
    });


    it('should be able to search for records using model deferred API', function(done) {
        User
            .search('vi')
            .exec(function(error, users) {
                if (error) {
                    done(error);
                } else {
                    expect(users.length).to.be.equal(4);

                    expect(_.map(users, 'username'))
                        .to
                        .include
                        .members(['Trent Marvin', 'Viva Gaylord', 'Victoria Steuber']);

                    expect(_.map(users, 'email'))
                        .to
                        .include
                        .members(['vicky2@gmail.com']);

                    done();
                }
            });
    });


    it('should be able to search for records using model promise API', function(done) {
        User
            .search('Malika')
            .then(function(users) {
                expect(users.length).to.be.equal(1);

                expect(users[0].username).to.be.equal('Malika Greenfelder');
                expect(users[0].email).to.be.equal('kory.dooley@gmail.com');

                done();
            })
            .catch(function(error) {
                done(error);
            });
    });

});