var models  = require('../models');
var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
  models.User.findAll().then(function(users) {
  	console.log(users);
    res.render('user/index', {
      title: 'Users',
      users: users
    });
  });
});


module.exports = router;