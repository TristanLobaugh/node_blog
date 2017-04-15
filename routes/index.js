const express = require('express');

const router = express.Router();
const mongo = require('mongodb');
let db = require('monk')('localhost/nodeblog');

const posts = db.get('posts');

/* GET home page. */
router.get('/', (req, res, next) => {
	db = req.db;
	posts.find({}, {}, (err, results) => {
		res.render('index', { results });
	});
});

module.exports = router;
