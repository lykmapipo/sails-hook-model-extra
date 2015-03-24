/**
 * sample model
 * @type {Object}
 */
module.exports = {
    //tells which attributes types are searchable
    //you can also configure it global to all models in `config/models.js`
    searchableTypes: [
        'string', 'text', 'integer',
        'float', 'json', 'email'
    ],

    attributes: {
        username: {
            type: 'string',
            required: true
        },
        email: {
            type: 'email',
            required: true,
            unique: true
        }
        // deletedAt: {
        //     type: 'datetime'
        // }
    }
};
