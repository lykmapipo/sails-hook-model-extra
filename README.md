sails-hook-model-extra
======================

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
The following methods will be added to all models once hook is installed.

* [`countAndFind(criteria, callback)`](https://github.com/lykmapipo/sails-hook-model-extra#countandfindcriteria-callback)
* [`countAndSearch(searchTerm, callback)`](https://github.com/lykmapipo/sails-hook-model-extra#countandsearchsearchterm-callback)
* [`first(howMany, callback)`](https://github.com/lykmapipo/sails-hook-model-extra#firsthowmany-callback)
* [`last(howMany, callback)`](https://github.com/lykmapipo/sails-hook-model-extra#lasthowmany-callback)
* [`search(searchTerm, callback)`](https://github.com/lykmapipo/sails-hook-model-extra#searchsearchterm-callback)
* [`softDelete(criteria, callback)`](https://github.com/lykmapipo/sails-hook-model-extra#softdeletecriteria-callback)


### `countAndFind(criteria, callback)`

Allow `count` and `find` to be executed as a compound(single) query.

- `criteria`: A valid sails waterline query criteria. If not provided an empty object criteria `{}` will be used. This criteria will be applied to both `count()` and `find()` query to retain result consistence.

- `callback`:  A callback to invoke on results. If not specified a `Deferred object` is returned to allow futher criteria(s) to be chained.

*Note!: `countAndFind()` run count() and find() in parallel*

#### Examples with no criteria

##### Using callback API
```js
//callback style
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
```

##### Using deferred API
```js
//deferred style
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
```

##### Using promis API
```js
//promise style
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
```

#### Examples with criteria provided

##### Using callback API
```js
//callback style
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
```

##### Using deferred API
```js
//deferred style
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
```

##### Using promise API
```js
//promise style
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
```


### `countAndSearch(searchTerm, callback)`
Count hits and perform to free search on model record(s). Currently `sails-hook-model-extra` will search model attributes of type `string, text, integer, float, json and email`, unless you explicit ovveride this default behaviour per model or globally on all models in `config/models.js` by providing array of searchable attributes types using `searchableTypes` static attribute.
i.e
```js
...

//tells which attributes types are searchable for only this model
//you can also configure it global for all models in `config/models.js`
searchableTypes: [
    'string', 'text', 'integer',
    'float', 'json', 'email'
]
...
```

- `searchTerm`: A string to be used in searching records. If not provided an empty object criteria `{}` will be used. This criteria will be applied to both `count()` and `find()` query to retain result consistence.

- `callback`:  A callback to invoke on results. If not specified a `Deferred object` is returned to allow futher criteria(s) to be chained.

*Warning!: Using this type of search directly when dataset is few hundreds otherwise consider using search with pagination*

*Note!: `countAndSearch()` run count() and find() in parallel*

#### Examples
##### Example using model callback API
```js
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
```
##### Example using model deferred API
```js
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
```
##### Example using model promise API
```js
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
```



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


### `search(searchTerm, callback)`
Allow to free search model record(s). Currently `sails-hook-model-extra` will search model attributes of type `string, text, integer, float, json and email`, unless you explicit ovveride this default behaviour per model or globally on all models in `config/models.js` by providing array of searchable attributes types using `searchableTypes` static attribute.
i.e
```js
...

//tells which attributes types are searchable for only this model
//you can also configure it global for all models in `config/models.js`
searchableTypes: [
    'string', 'text', 'integer',
    'float', 'json', 'email'
]
...
```

- `searchTerm`: A string to be used in searching records. If not provided an empty object criteria `{}` will be used.

- `callback`:  A callback to invoke on results. If not specified a `Deferred object` is returned to allow futher criteria(s) to be chained.

*Warning!: Using this type of search directly when dataset is few hundreds otherwise consider using search with pagination*

#### Examples
##### Example using model callback API
```js
User
    .search('gmail', function(error, users) {
        if (error) {
            done(error)
        } else {
            expect(users.length).to.be.equal(4);

            expect(_.map(users, 'username'))
                .to.include.members(['Trent Marvin', 'Malika Greenfelder']);

            done();
        }
    });
```
##### Example using model deferred API
```js
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
```
##### Example using model promise API
```js
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
```


### `softDelete(criteria, callback)`
Allow to soft delete model(s) by set `deletedAt` attribute to current timestamp. Currently `sails-hook-model-extra` will extend loaded models with `deletedAt datetime` attribute unless explicit defined on the models.

- `criteria`: A valid sails waterline query criteria. If not provided an empty object criteria `{}` will be used.

- `callback`:  A callback to invoke on results. If not specified a `Deferred object` is returned to allow futher criteria(s) to be chained.

#### Examples
##### Example using model callback API
```js
User
    .softDelete({
        id: user.id
    }, function(error, deletedUsers) {
        if (error) {
            done(error);
        } else {
            expect(deletedUsers.length).to.be.equal(1);
            expect(deletedUsers[0].deletedAt).to.not.be.null;
            done();
        }
    });
```

##### Example using model deferred API
```js
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
            done();
        }
    });
```

##### Example using model promise API
```js
User
    .softDelete({
        id: user.id
    })
    .then(function(deletedUsers) {
        expect(deletedUsers.length).to.be.equal(1);
        expect(deletedUsers[0].deletedAt).to.not.be.null;
        done();
    })
    .catch(function(error) {
        done(error);
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

- [Waterline](https://github.com/balderdashy/waterline)
- [Sails Waterline(ORM)](http://sailsjs.org/#!/documentation/reference/waterline)
- [Sail ORM](http://sailsjs.org/#!/documentation/concepts/ORM)
- [Rails ActiveRecord FinderMethods](http://api.rubyonrails.org/classes/ActiveRecord/FinderMethods.html)
- [Waterline aggregate queries](https://github.com/balderdashy/waterline/issues/61)


## Licence

The MIT License (MIT)

Copyright (c) 2015 lykmapipo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 