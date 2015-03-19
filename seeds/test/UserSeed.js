'use strict';
var faker = require('faker');
var users = [];

//fake users
for (var i = 0; i < 10; i++) {
    users.push({
        email: faker.internet.email().toLowerCase(),
        username: faker.name.firstName() + ' ' + faker.name.lastName()
    });
};

/**
 * exports user seeds
 */
module.exports = users;
