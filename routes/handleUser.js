const express = require('express');

const router = express.Router();
const User = require('../models/user')

router.get('/allUsers/:id', (req, res) => {
  const identifier = req.params.id;
  User.find({_id: {$ne: identifier}}, (err, totalUsers) => {
    if(err) {
      console.log(err);
    } else {
      res.json(totalUsers)
    }
  })
})

router.get('/allUsers', (req, res) => {
  User.find({}, (err, totalUsers) => {
    if(err) {
      console.log(err);
    } else {
      res.json(totalUsers)
    }
  })
})


module.exports = router;

