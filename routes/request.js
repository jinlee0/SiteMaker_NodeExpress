const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Project, User } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const {requestName, requestEmail, requestJob, type, deadline, estimate, urlSamples, etcRequirements} = req.body;
  let {requestPhone} = req.body;

  requestPhone = requestPhone.split('-').join('');

  await Project.create({
    requestName,
    requestPhone,
    requestEmail,
    requestJob,
    type,
    deadline,
    estimate,
    urlSamples,
    etcRequirements,
    UserId: req.user.id,
  });

  return res.redirect('/');
});

router.post('/confirm', isLoggedIn, async (req, res, next) => {
  console.log(req.body.projectId);
  await Project.update({complete: true}, {where: {id: req.body.projectId}});
  return res.redirect('/request');
});

module.exports = router;
