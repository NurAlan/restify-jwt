const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');

module.exports = server => {

    server.post('/register', () => (req, res, next) => {
        const { email, password } = req.body;
        const user = new User({
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                user.password = hash;
                try {
                    const newUser = await user.save();
                    res.send(201);
                    next();
                } catch (err) {
                    return next(new errors.InternalError(err.message));
                }
            });
        });
    });
}