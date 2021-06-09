const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const {Team, Project, User} = require('./../models');
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
  try{
    let teams = await Team.findAll();
    console.log(teams);
    let members = Array();
    for(let i = 0; i < teams.length; i++){
      members[i] = await teams[i].getMembers();
      teams[i].members = members[i];
    }
    res.render('main', {
      title: 'main',
      teams,
    });
  } catch(err){
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

router.get('/project_list', isLoggedIn, async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      where:{
        UserId: req.user.id
      }
    });
    console.log(projects);

    res.render('project_list', {
      title : '프로젝트 목록',
      projects,
    })
  } catch(err){
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
