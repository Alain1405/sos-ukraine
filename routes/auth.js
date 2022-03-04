var express = require('express');

var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var config = require('config')

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}


passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { username: user.user });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});
passport.use(new LocalStrategy(function verify(usr, psw, cb) {

    const user = config.get("auth.user");
    const password = config.get("auth.password");

    if (user != usr || password != psw) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, { "user": user, "password": password });


}));
router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/login', function (req, res, next) {
    res.render('login');
});

module.exports = { authRouter: router, ensureAuthenticated: ensureAuthenticated };