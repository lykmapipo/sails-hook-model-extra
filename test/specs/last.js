'use strict';
var expect = require('chai').expect;

describe('Model#last', function() {

    it('should be able to attach last as model method', function(done) {
        expect(User).to.respondTo('last');
        done();
    });

    it('should be able to set only one record is wanted by default', function(done) {
        var last = User.last();
        expect(last.howMany).to.be.equal(1);
        done();
    });

    it('should be able to set how many records are wanted', function(done) {
        var last = User.last(5);
        expect(last.howMany).to.be.equal(5);
        done();
    });



    it('should be able to get a last record using callback model API', function(done) {

        User
            .last(function(error, users) {
                if (error) {
                    done(error);
                } else {
                    expect(users[0].id).to.be.equal(10);
                    expect(users.length).to.be.equal(1);
                    done();
                }
            });

    });


    it('should able to get last five records using callback model API', function(done) {

        User
            .last(5, function(error, users) {
                if (error) {
                    done(error);
                } else {
                    expect(_.map(users, 'id'))
                        .to.include.members([10, 9, 8, 7, 6]);
                        
                    expect(users.length).to.be.equal(5);
                    done();
                }
            });

    });


    it('should be able to get a last record using deferred model API', function(done) {

        User
            .last()
            .exec(function(error, users) {
                if (error) {
                    done(error);
                } else {
                    expect(users[0].id).to.be.equal(10);
                    expect(users.length).to.be.equal(1);
                    done();
                }
            });

    });


    it('should be able to get last five record using promise model API', function(done) {

        User
            .last(5)
            .then(function(users) {
                expect(_.map(users, 'id'))
                    .to.include.members([10, 9, 8, 7, 6]);

                expect(users.length).to.be.equal(5);
                done();
            })
            .catch(function(error) {
                done(error);
            });

    });


    it('should be able to apply other criteria(s) on returned deferred to get a last record',
        function(done) {

            User
                .last()
                .where({
                    id: {
                        '<': 8
                    }
                })
                .exec(function(error, users) {
                    if (error) {
                        done(error);
                    } else {
                        expect(users[0].id).to.be.equal(7);
                        expect(users.length).to.be.equal(1);
                        done();
                    }
                });

        }
    );

    it('should be able to apply other criteria(s) on returned deferred to get last five record(s)',
        function(done) {

            User
                .last(5)
                .where({
                    id: {
                        '<': 8
                    }
                })
                .exec(function(error, users) {
                    if (error) {
                        done(error);
                    } else {
                        expect(_.map(users, 'id'))
                            .to.include.members([7, 6, 5, 4, 3]);

                        expect(users.length).to.be.equal(5);

                        done();
                    }
                });

        }
    );

});
