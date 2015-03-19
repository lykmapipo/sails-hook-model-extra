/**
 * sample model
 * @type {Object}
 */
module.exports = {
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
    }
};
