const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const Auth = require('../auth')

module.exports = server => {
    server.post('/register', (req, res, next) => {
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

    server.post('/auth', async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const user = await Auth.authenticate(email, password);
            console.log(user);
            next();
        } catch (err) {
            return next(new errors.UnauthorizedError(err));
        }
    })
}