'use strict';
var expect = require('chai').expect;
var faker = require('faker');

describe('Model#search', function() {

    it('should be able to attach search as model method', function(done) {
        expect(User).to.respondTo('search');
        done();
    });

    it('should be able to run as find() when no searchTerm provided', function(done) {
        User
            .search(function(error, users) {
                if (error) {
                    done(error)
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
                    done(error)
                } else {
                    expect(users.length).to.be.equal(4);

                    expect(_.map(users, 'username'))
                        .to.include.members(['Trent Marvin','Malika Greenfelder']);
                    
                    done();
                }
            });
    });

});
