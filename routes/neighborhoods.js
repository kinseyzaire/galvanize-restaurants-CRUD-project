var express = require('express');
var knex = require('../db/knex.js');
var router = express.Router();

function Neighborhoods() {
   return knex('neighborhoods');
}

// list all neighborhoods

router.get('/neighborhoods', function(req, res, next) {
  Neighborhoods().select().then(function(results){
    res.render('neighborhoods/show', {neighborhoods: results});
  });
});

// new neighborhood page

router.get('/restaurants/new', function(req, res, next) {
  res.render('restaurants/new');
});

// add new neighborhood

router.post('/restaurants', function(req, res, next) {
  Neighborhoods().insert(req.body).then(function(result){
    res.redirect('/restaurants');
  });
});

// show neighborhood

router.get('/restaurants/:id', function (req, res, next) {
  Restaurants().where('id', req.params.id).first().then(function(rresult){
    Employees().where('restaurant_id', req.params.id).then(function(eresults){
      Reviews().where('restaurant_id', req.params.id).then(function(cresults){
        res.render('restaurants/show', { restaurant: rresult, employees: eresults, reviews: cresults });
      });
    });
  });
});

// edit neighborhood

router.get('/restaurants/:id/edit', function (req, res) {
  Restaurants().where('id', req.params.id).first().then(function(result){
    res.render('restaurants/edit', { restaurant: result });
  });
});

// update - send edit form

router.post('/restaurants/:id', function (req, res) {
  Restaurants().where('id', req.params.id).update(req.body)
  .then(function(result){
    res.redirect('/restaurants');
  });
});

// delete a neighborhood

router.post('/restaurants/:id/delete', function (req, res) {
  Restaurants().where('id', req.params.id).del()
  .then(function (result) {
    res.redirect('/restaurants');
  });
});


module.exports = router;
