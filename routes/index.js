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

// function JoinTest() {
//   return knex('restaurants')
//     .join('employees', 'restaurants.id', '=', 'employees.restaurant_id')
//     .select('*');
// }
// console.log(JoinTest);

// list all restaurants

router.get('/', function(req, res, next) {
  Restaurants().select().then(function(results){
    res.render('restaurants/index', {restaurants: results});
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

// admin pages
// list all restaurants

router.get('/admin', function(req, res, next) {
   Restaurants().select().then(function(rresults){
     Employees().select().then(function(eresults){
       res.render('admin/index', {restaurants: rresults, employees: eresults});
     });
   });
});

// ********************************************************* add employees

// NEW - get to add employee form
router.get('/restaurants/:id/employees/new', function (req, res) {
  res.render('employees/new', {restaurantidentification: req.params.id});
});

// NEW SAVE - post new employee form
router.post('/restaurants/:restaurant_id/employees/', function(req, res, next) {
  var restid = req.params.restaurant_id;
  Employees().insert(req.body).then(function(result){
    res.redirect('/restaurants/'+ restid);
  });
});

// SHOW - show employee
router.get('/restaurants/:restaurant_id/employees/:id', function (req, res, next) {
  Employees().where('id', req.params.id).first().then(function(result){
    res.render('employees/show', { employee: result });
  });
});

// EDIT get to edit employee form
router.get('/restaurants/:restaurant_id/employees/:id/edit', function (req, res) {
  Employees().where('id', req.params.id).first().then(function(result){
    res.render('employees/edit', {employee: result});
  });
});

// UPDATE edited employee form
router.post('/restaurants/:restaurant_id/employees/:id', function(req, res, next) {
  var restid = req.params.restaurant_id;
  Employees().where('id', req.params.id).update(req.body).then(function(result){
    res.redirect('/restaurants/' + restid);
  });
});

// DELETE an employee
router.post('/restaurants/:restaurant_id/employees/:id/delete', function (req, res) {
  var restid = req.params.restaurant_id;
  Employees().where('id', req.params.id).del().then(function (result) {
    res.redirect('/restaurants/' + restid);
  });
});

// ********************************************************* add reviews

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
