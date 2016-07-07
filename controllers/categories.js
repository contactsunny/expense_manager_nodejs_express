var models  = require('../models');
var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
	var categoryTypes = [];
	models.CategoryType.findAll().then(function(categoryTypes) {
		console.log(categoryTypes);
		// categoryTypes = categoryTypes;
		models.Category.findAll().then(function(categories) {
		console.log(categories);
			res.render('categories/index', {
				title: 'Categories',
				categories: categories,
				categoryTypes: categoryTypes
			});
		});
	});
});

router.get('/list', function(req, res) {

	models.Category.findAll().then(function(categories) {
		res.contentType('json');
		res.send(JSON.stringify({"data": categories}));
	});
});

router.post('/create', function(req, res){

	models.Category.create({
		category_name: req.body.category_name,
		category_type: req.body.category_type
    }).then(function(result) {
		res.contentType('json');
		res.send(JSON.stringify(result));
    });
});


module.exports = router;