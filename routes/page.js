const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
// const { Post, User, Hashtag } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// router.get('/profile', isLoggedIn, (req, res) => {
//   res.render('profile', { title: '내 정보 - NodeBird' });
// });

// router.get('/join', isNotLoggedIn, (req, res) => {
//   res.render('join', { title: '회원가입 - NodeBird' });
// });

router.get('/', async (req, res, next) => {
  try {
    res.render('main', {
      title: 'SITE MAKER',
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/login', async (req, res, next) => {
  try {
    res.render('login', {
      title: '로그인'
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/request', isLoggedIn, async (req, res, next) => {
  try {
    res.render('request', {
      title: '의뢰',
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/join', isNotLoggedIn, async (req, res, next) => {
  try {
    res.render('join', {
      title: '회원가입',
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// router.get('/hashtag', async (req, res, next) => {
//   const query = req.query.hashtag;
//   if (!query) {
//     return res.redirect('/');
//   }
//   try {
//     const hashtag = await Hashtag.findOne({ where: { title: query } });
//     let posts = [];
//     if (hashtag) {
//       posts = await hashtag.getPosts({ include: [{ model: User }] });
//     }

//     return res.render('main', {
//       title: `${query} | NodeBird`,
//       twits: posts,
//     });
//   } catch (error) {
//     console.error(error);
//     return next(error);
//   }
// });

module.exports = router;
