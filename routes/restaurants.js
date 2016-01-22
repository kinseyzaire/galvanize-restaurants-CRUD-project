var express = require('express');
var knex = require('../db/knex.js');
var router = express.Router();

function Restaurants() {
   return knex('restaurants');
}

function Employees() {
   return knex('employees');
}

function Reviews() {
   return knex('reviews');
}

// admin pages
// list all restaurants

router.get('/admin', function(req, res, next) {
   Restaurants().select().then(function(rresults){
     Employees().select().then(function(eresults){
       res.render('admin/index', {restaurants: rresults, employees: eresults});
     });
   });
});

// list all restaurants

router.get('/restaurants', function(req, res, next) {
  Restaurants().select().then(function(results){
    res.render('restaurants/index', {restaurants: results});
  });
});

// new restaurant page

router.get('/restaurants/new', function(req, res, next) {
  res.render('restaurants/new');
});

// add new restaurant

router.post('/restaurants', function(req, res, next) {
  Restaurants().insert(req.body).then(function(result){
    res.redirect('/restaurants');
  });
});

// show restaurant

router.get('/restaurants/:id', function (req, res, next) {
  Restaurants().where('id', req.params.id).first().then(function(rresult){
    Employees().where('restaurant_id', req.params.id).then(function(eresults){
      Reviews().where('restaurant_id', req.params.id).then(function(cresults){
        res.render('restaurants/show', { restaurant: rresult, employees: eresults, reviews: cresults });
      });
    });
  });
});

// edit restaurant

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

// delete a restaurant

router.post('/restaurants/:id/delete', function (req, res) {
  Restaurants().where('id', req.params.id).del()
  .then(function (result) {
    res.redirect('/restaurants');
  });
});

module.exports = router;
