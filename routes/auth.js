const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('../passport/GoogleStrategy.js');
require('../passport/KakaoStrategy.js');
require('../passport/NaverStrategy.js');
const passport = require('passport');

router.all('/*', function( req, res, next) {
    res.header( "Access-Control-Allow-Origin", "*" );
    next();
});
router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/failed'}), function(req, res) {
    res.redirect(`${process.env.CLIENT_URL}?token=${setUserToken(req.user)}`);
})

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {failureRedirect: '/auth',}), (req,res) => {
    res.redirect(`${process.env.CLIENT_URL}?token=${setUserToken(req.user)}`);
  }
);

router.get('/naver', passport.authenticate('naver', { scope : ['profile', 'email'] }));

router.get('/naver/callback', passport.authenticate('naver', {failureRedirect: '/failed'}), function(req, res) {
    res.redirect(`${process.env.CLIENT_URL}?token=${setUserToken(req.user)}`);
})


router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send(true);
});

module.exports = router;