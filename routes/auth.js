const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');


const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, password, name, phone, job } = req.body;
  let _name = name, _phone = phone;
  try {
    const existUser = await User.findOne({ where: { email } });
    if (existUser) {
      return res.redirect('/join?error=exist');
    }
    if(_name === ''){
      _name = email.split('@')[0];
    }
    _phone = _phone.split('-').join('');
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      name: _name,
      email,
      password : hash,
      phone: _phone,
      job,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;