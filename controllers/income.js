var models  = require('../models');
var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
	
	models.Expense.findAll({
		include: 
			[
				{ model: models.Category, where: {category_type: 1} }
			]
		}).then(function(income	) {
		console.log(income	);
		// res.render('categories/index', {
		// 	title: 'Categories',
		// 	categories: categories,
		// 	categoryTypes: categoryTypes
		// });
	});
});

module.exports = router;