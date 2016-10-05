var models  = require('../models');
var express = require('express');
var request = require('request');
var log = require('../lib/logger.js');

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

	models.Category.findAll({include: [models.CategoryType]}).then(function(categories) {
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

router.post('/update', function(req, res){

	var response = null;

	models.Category.find({ where: {id: req.body.category_id}} ).then(function(category) {
		if (category) {
		    category.updateAttributes({
				category_name: req.body.category_name,
				category_type: req.body.category_type
		    }).success(function() {
		    	response = {'result': 1};
		    }).error(function() {
		    	response = {'result': 0};
		    });
		} else {
			response = {'result': 0};
		}
	});

	res.contentType('json');
	res.send(JSON.stringify(response));
});

router.delete('/:category_id/destroy', function(req, res) {
  models.Category.destroy({
    where: {
      id: req.params.category_id
    }
  }).then(function() {
    res.contentType('json');
	res.send(JSON.stringify({'result': 1}));
  });
});

router.get('/test', function(req, res) {
	
	log.info(req);

	var jsonBody = [
		{
			"key": "value",
			"key": "value",
			"key": "value"
		},
		{
			"key": "value",
			"key": "value",
			"key": "value"
		},
		{
			"key": "value",
			"key": "value",
			"key": "value"
		}
	];

	var options = {
		baseUrl: 'https://httpbin.org',
		uri: '/post',
		method: 'POST',
		headers: {},
		json: true,
		// body: JSON.stringify(jsonBody)
		body: jsonBody
	};

	// log.info(options);

	request(options, function(error, response, body) {
		sampleCallback(res, error, response, body);
	});
});

function sampleCallback(res, error, response, body) {
	res.send(body);
}


module.exports = router;