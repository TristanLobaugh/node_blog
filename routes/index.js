var express = require('express');

var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

/* GET home page. */
router.get('/', (req, res, next) => {
	db = req.db;
	var posts = db.get('posts');
	posts.find({}, {}, (err, results) => {
		res.render('index', { results });
	});
});

module.exports = router;
