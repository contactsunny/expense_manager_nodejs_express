var models  = require('../models');
var express = require('express');
var passwordCrypt = require('../lib/passwordCrypt');

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
  var password = req.body.password;
  
  passwordCrypt.cryptPassword(password, function(err, hash) {
    if(err) {
      console.log(err);
      res.send('Something went wrong! Check console for more info.');
    }

    models.User.create({
      email: req.body.email,
      password: hash
    }).then(function() {
      res.redirect('/');
    });
  });
});

router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  models.User.findOne({
    where: {email: email}
  }).then(function(User) {
    passwordCrypt.comparePassword(password, User.password, function(err, isPasswordMatch) {
      if(err) {
        console.log(err);
        res.send('Something went wrong! Check console for more info.');
      }

      if(isPasswordMatch) {
        res.redirect('/dashboad');
      } else {
        res.send('Wrong email-password combination! Try again!');
      }

    });
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