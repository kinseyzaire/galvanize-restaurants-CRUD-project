var express = require('express');
var knex = require('../db/knex.js');
var router = express.Router();

function Employees() {
   return knex('employees');
}

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

module.exports = router;
