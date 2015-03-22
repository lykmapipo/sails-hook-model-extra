'use strict';
var expect = require('chai').expect;
var faker = require('faker');

describe('Model#softDelete', function() {
    var user;

    //create user
    before(function(done) {
        User.create({
            email: faker.internet.email(),
            username: faker.internet.email()
        }, function(error, response) {
            if (error) {
                done(error);
            } else {
                user = response;
                done();
            }
        });
    });

    it('should be able attach softDelete model method', function(done) {
        expect(User).to.respondTo('softDelete');
        done();
    });

    describe('Model#softDelete#static', function() {
        //clear user deletedAt before each spec
        beforeEach(function(done) {
            user.deletedAt = null;

            user
                .save(function(error, response) {
                    if (error) {
                        done(error);
                    } else {
                        user = response;
                        done();
                    }
                });
        });

        it('should be able to soft delete model(s) using callback model API', function(done) {
            User
                .softDelete({
                    id: user.id
                }, function(error, deletedUsers) {
                    if (error) {
                        done(error);
                    } else {

                        expect(deletedUsers.length).to.be.equal(1);
                        expect(deletedUsers[0].deletedAt).to.not.be.null;

                        expect(deletedUsers[0].id).to.be.equal(user.id);
                        expect(deletedUsers[0].email).to.be.equal(user.email);

                        done();
                    }
                });
        });

        it('should be able to soft delete model(s) using deferred model API', function(done) {
            User
                .softDelete({
                    id: user.id
                })
                .exec(function(error, deletedUsers) {
                    if (error) {
                        done(error);
                    } else {

                        expect(deletedUsers.length).to.be.equal(1);
                        expect(deletedUsers[0].deletedAt).to.not.be.null;

                        expect(deletedUsers[0].id).to.be.equal(user.id);
                        expect(deletedUsers[0].email).to.be.equal(user.email);

                        done();
                    }
                });
        });


        it('should be able to soft delete model(s) using promise model API', function(done) {
            User
                .softDelete({
                    id: user.id
                })
                .then(function(deletedUsers) {
                    expect(deletedUsers.length).to.be.equal(1);
                    expect(deletedUsers[0].deletedAt).to.not.be.null;

                    expect(deletedUsers[0].id).to.be.equal(user.id);
                    expect(deletedUsers[0].email).to.be.equal(user.email);

                    done();
                })
                .catch(function(error) {
                    done(error);
                });
        });

    });

});
