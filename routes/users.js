var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function(req, res) {
  models.User.findAll().then(function(users) {
  	console.log(users);
    res.render('users', {
      title: 'Users',
      users: users
    });
  });
});

router.post('/create', function(req, res) {
  models.User.create({
    email: req.body.email,
    password: req.body.password
  }).then(function() {
    res.redirect('/users');
  });
});

router.get('/:user_id/destroy', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    res.redirect('/users');
  });
});

module.exports = router;