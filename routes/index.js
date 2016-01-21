var express = require('express');
var knex = require('../db/knex.js');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/restaurants');
});

// admin pages
// list all restaurants

router.get('/admin', function(req, res, next) {
   Restaurants().select().then(function(rresults){
     Employees().select().then(function(eresults){
       res.render('admin/index', {restaurants: rresults, employees: eresults});
     });
   });
});

module.exports = router;
