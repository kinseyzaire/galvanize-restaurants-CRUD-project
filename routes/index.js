var express = require('express');
var knex = require('../db/knex.js');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/restaurants');
});

module.exports = router;
