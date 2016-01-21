var express = require('express');
var knex = require('../db/knex.js');
var router = express.Router();

function Reviews() {
   return knex('reviews');
}

// NEW - get to add reviews form
router.get('/restaurants/:id/reviews/new', function (req, res) {
  res.render('reviews/new', {restaurantidentification: req.params.id});
});

// NEW SAVE - post new reviews form
router.post('/restaurants/:restaurant_id/reviews/', function(req, res, next) {
  var restid = req.params.restaurant_id;
  Reviews().insert(req.body).then(function(result){
    res.redirect('/restaurants/'+ restid);
  });
});

// SHOW - show reviews
router.get('/restaurants/:restaurant_id/reviews/:id', function (req, res, next) {
  Reviews().where('id', req.params.id).first().then(function(result){
    res.render('reviews/show', { review: result });
  });
});

// EDIT get to edit reviews form
router.get('/restaurants/:restaurant_id/reviews/:id/edit', function (req, res) {
  Reviews().where('id', req.params.id).first().then(function(result){
    res.render('reviews/edit', {review: result});
  });
});

// UPDATE edited reviews form
router.post('/restaurants/:restaurant_id/reviews/:id', function(req, res, next) {
  var restid = req.params.restaurant_id;
    Reviews().where('id', req.params.id).update(req.body).then(function(result){
      res.redirect('/restaurants/'+ restid);
    });
});

// DELETE an reviews
router.post('/restaurants/:restaurant_id/reviews/:id/delete', function (req, res) {
  var restid = req.params.restaurant_id;
  Reviews().where('id', req.params.id).del().then(function (result) {
    res.redirect('/restaurants/'+ restid);
  });
});


module.exports = router;
