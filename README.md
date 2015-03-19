sails-hook-model-extra (WIP)
============================

[![Build Status](https://travis-ci.org/lykmapipo/sails-hook-model-extra.svg?branch=master)](https://travis-ci.org/lykmapipo/sails-hook-model-extra)

[![Tips](https://img.shields.io/gratipay/lykmapipo.svg)](https://gratipay.com/lykmapipo/)

[![Support via Gratipay](https://cdn.rawgit.com/gratipay/gratipay-badge/2.3.0/dist/gratipay.svg)](https://gratipay.com/lykmapipo/)

Additional model methods for sails. They works with both `callback`, `deferred` and `promise` style `model API` provided with sails.

*Note: This requires Sails v0.11.0+.  If v0.11.0+ isn't published to NPM yet, you'll need to install it via Github.*

## Installation
```sh
$ npm install --save sails-hook-model-extra
```

## API
The following methods will be added to you model once hook is installed

### `countAndFind(criteria, callback)`

### `first(howMany, callback)`
Allow to select top(first) `n records(models)` from the database.

- `howMany` : Specify how many records required. If not provided only single record is returned.
- `callback` : A callback to invoke on results. If not specified a `Deferred object` is returned to allow futher criteria(s) to be chained.

#### Examples with no additional criterias

##### Get only first record
```js
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
```

##### Get top five records
```js
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
```

#### Examples with additional criterias

##### Get only first record where id > 2
```js
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
```

##### Get top five records where id > 2
```js
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
```

### `last(howMany, callback)`
Allow to select bottom(last) `n records(models)` from the database.

- `howMany` : Specify how many records required. If not provided only single record is returned.
- `callback` : A callback to invoke on results. If not specified a `Deferred object` is returned to allow futher criteria(s) to be chained.

#### Examples with no additional criterias

##### Get only last record
```js
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
```

##### Get last five records
```js
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
```

#### Examples with additional criterias

##### Get only last record where id < 8
```js
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
```

##### Get las five records where id < 8
```js
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
```


## Testing
* Clone this repository

* Install all development dependencies
```sh
$ npm install
```

* Then run test
```sh
$ npm test
```

## Contribute

Fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## Literature Reviewed

- [Rails ActiveRecord FinderMethods](http://api.rubyonrails.org/classes/ActiveRecord/FinderMethods.html)

- [Waterline aggregate queries](https://github.com/balderdashy/waterline/issues/61)


## Licence

The MIT License (MIT)

Copyright (c) 2015 lykmapipo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 