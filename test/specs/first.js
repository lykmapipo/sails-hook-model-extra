'use strict';
var expect = require('chai').expect;

describe('Model#first', function() {

    it('should be able to attach first as model method', function(done) {
        expect(User).to.respondTo('first');
        done();
    });

    it('should be able to set only one record is wanted by default', function(done) {
        var first = User.first();

        expect(first._criteria.skip).to.be.equal(0);
        expect(first._criteria.limit).to.be.equal(1);

        done();
    });

    it('should be able to set how many records are wanted', function(done) {
        var first = User.first(5);

        expect(first._criteria.skip).to.be.equal(0);
        expect(first._criteria.limit).to.be.equal(5);

        done();
    });



    it('should be able to get a first record using callback model API', function(done) {

        User
            .first(function(error, users) {
                if (error) {
                    done(error);
                } else {
                    expect(users[0].id).to.be.equal(1);
                    expect(users.length).to.be.equal(1);
                    done();
                }
            });

    });


    it('should able to get first five records using callback model API', function(done) {

        User
            .first(5, function(error, users) {
                if (error) {
                    done(error);
                } else {
                    expect(_.map(users, 'id'))
                        .to.include.members([1, 2, 3, 4, 5]);

                    expect(users.length).to.be.equal(5);
                    done();
                }
            });

    });


    it('should be able to get a first record using deferred model API', function(done) {

        User
            .first()
            .exec(function(error, users) {
                if (error) {
                    done(error);
                } else {
                    expect(users[0].id).to.be.equal(1);
                    expect(users.length).to.be.equal(1);
                    done();
                }
            });

    });


    it('should be able to get first five record using promise model API', function(done) {

        User
            .first(5)
            .then(function(users) {
                expect(_.map(users, 'id'))
                    .to.include.members([1, 2, 3, 4, 5]);

                expect(users.length).to.be.equal(5);
                done();
            })
            .catch(function(error) {
                done(error);
            });

    });


    it('should be able to apply other criteria(s) on returned deferred to get a first record',
        function(done) {

            User
                .first()
                .where({
                    id: {
                        '>': 2
                    }
                })
                .exec(function(error, users) {
                    if (error) {
                        done(error);
                    } else {
                        expect(users[0].id).to.be.equal(3);
                        expect(users.length).to.be.equal(1);
                        done();
                    }
                });

        }
    );

    it('should be able to apply other criteria(s) on returned deferred to get first five record(s)',
        function(done) {

            User
                .first(5)
                .where({
                    id: {
                        '>': 2
                    }
                })
                .exec(function(error, users) {
                    if (error) {
                        done(error);
                    } else {
                        expect(_.map(users, 'id'))
                            .to.include.members([3, 4, 5, 6, 7]);

                        expect(users.length).to.be.equal(5);
                        done();
                    }
                });

        }
    );

});
