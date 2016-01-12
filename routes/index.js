var express = require('express');
var router = express.Router();

// var knex = require('knex')({
//     client: 'pg',
//     connection: process.env.DATABASE_URL || 'postgres://localhost/library'
//   });

router.get('/', function(req, res, next) {
  res.render('index', { title: 'gRestaurants' });
});

module.exports = router;
