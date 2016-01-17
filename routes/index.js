var express = require('express');
var knex = require('../knex.js');
var router = express.Router();

function Restaurants() {
   return knex('restaurants');
}

function Employees() {
   return knex('employees');
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
      res.render('restaurants/show', { restaurant: rresult, employees: eresults });
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

// add employees

// get to add employee form
router.get('/restaurants/:id/employees/new', function (req, res) {
  res.render('employees/new', {restaurantidentification: req.params.id});
});

// post new employee form
router.post('/restaurants/:restaurant_id/employees/', function(req, res, next) {
  Employees().insert(req.body).then(function(result){
    res.redirect('/admin');
  });
});

// show employee
router.get('/restaurants/:restaurant_id/employees/:id', function (req, res, next) {
  Employees().where('id', req.params.id).first().then(function(result){
    res.render('employees/show', { employee: result });
  });
});

// get to edit employee form
router.get('/restaurants/:restaurant_id/employees/:id/edit', function (req, res) {
  Employees().where('id', req.params.id).first().then(function(result){
    res.render('employees/edit', {employee: result});
  });
});

// update edited employee form
router.post('/restaurants/:restaurant_id/employees/:id', function(req, res, next) {
  Employees().where('id', req.params.id).update(req.body).then(function(result){
    res.redirect('/admin');
  });
});

// delete an employee

router.post('/restaurants/:restaurant_id/employees/:id/delete', function (req, res) {
  Employees().where('id', req.params.id).del().then(function (result) {
    res.redirect('/admin');
  });
});


module.exports = router;
