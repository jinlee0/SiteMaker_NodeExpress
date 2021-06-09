const passport = require('passport');
const bcrypt = require('bcrypt');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('kakao profile', profile);
    try {
      const exUser = await User.findOne({
        where: { email: profile._json.kakao_account.email},
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const hash = await bcrypt.hash('kakao', 12);
        const newUser = await User.create({
          name: profile.displayName,
          email: profile._json && profile._json.kakao_account_email,
          password: hash,
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
