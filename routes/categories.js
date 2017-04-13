const express = require('express');

const router = express.Router();
const mongo = require('mongodb');

const db = require('monk')('localhost/nodeblog');

const posts = db.get('posts');
const categories = db.get('categories');

/* GET users listing. */
router.get('/add', (req, res, next) => {
	res.render('addcategory', {
		title: 'Add Category'
	});
});

router.get('/show/:category', (req, res, next) => {
	posts.find({ category: req.params.category }, {}, (err, results) => {
		console.log(results);
		res.render('index', {
			title: req.params.category,
			results
		});
	});
});

router.post('/add', (req, res, next) => {
	const name = req.body.name;

	req.checkBody('name', 'Name field is required').notEmpty();

	const errors = req.validationErrors();
	if (errors) {
		res.render('addcategory', { errors });
	} else {
		categories.insert({
			name
		}, (err, post) => {
			if (err) {
				res.send(err);
			} else {
				req.flash('success', 'Category Added');
				res.location('/');
				res.redirect('/');
			}
		});
	}
});

module.exports = router;
