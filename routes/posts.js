var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongo = require('mongodb');

var db = require('monk')('localhost/nodeblog');
var upload = multer({ dest: 'uploads/' });

const posts = db.get('posts');
const categories = db.get('categories');

/* GET users listing. */
router.get('/add', (req, res, next) => {
	categories.find({}, {}, (err, results) => {
		res.render('addpost', {
			title: 'Add Post',
			categories: results
		});
	});
});

router.post('/add', upload.single('mainimage'), (req, res, next) => {
	const title = req.body.title;
	const category = req.body.category;
	const body = req.body.body;
	const author = req.body.author;
	const date = new Date();
	let mainimage = 'noimage.jpg';

	if (req.file) {
		mainimage = req.file.filename;
	}

	req.checkBody('title', 'Title field is required').notEmpty();
	req.checkBody('body', 'Body field is required').notEmpty();

	const errors = req.validationErrors();
	if (errors) {
		res.render('addpost', { errors });
	} else {
		posts.insert({
			title,
			body,
			category,
			date,
			author,
			mainimage
		}, (err, post) => {
			if (err) {
				res.send(err);
			} else {
				req.flash('success', 'Post Added');
				res.location('/');
				res.redirect('/');
			}
		});
	}
});

module.exports = router;
