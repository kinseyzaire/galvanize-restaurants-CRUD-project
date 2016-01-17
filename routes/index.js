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

router.get('/', function(req, res, next) {
  Restaurants().select().then(function(results){
    res.render('restaurants/index', {restaurants: results});
  });
});

router.get('/restaurants', function(req, res, next) {
  Restaurants().select().then(function(results){
    res.render('restaurants/index', {restaurants: results});
  });
});

router.get('/restaurants/new', function(req, res, next) {
  res.render('restaurants/new');
});

router.post('/restaurants', function(req, res, next) {
  Restaurants().insert(req.body).then(function(result){
    res.redirect('/restaurants');
  });
});

router.get('/restaurants/:id', function (req, res, next) {
  Restaurants().where('id', req.params.id).first().then(function(result){
    res.render('restaurants/show', { restaurant: result });
  });
})

router.get('/restaurants/:id/edit', function (req, res) {
  Restaurants().where('id', req.params.id).first().then(function(result){
    res.render('restaurants/edit', { restaurant: result });
  });
})

router.post('/restaurants/:id', function (req, res) {
  Restaurants().where('id', req.params.id).update(req.body)
  .then(function(result){
    res.redirect('/restaurants');
  });
});

router.post('/restaurants/:id/delete', function (req, res) {
  Restaurants().where('id', req.params.id).del()
  .then(function (result) {
    res.redirect('/restaurants');
  })
})

// admin pages

router.get('/admin', function(req, res, next) {
   Restaurants().select().then(function(rresults){
     Employees().select().then(function(eresults){
       res.render('admin/index', {restaurants: rresults, employees: eresults});
     });
   });
});

// add employees

// router.get('/restaurants/:id/employees/new', function (req, res) {
//   Restaurants().where('id', req.params.id).first().then(function(result){
//     res.render('employees/new', { restaurant: result });
//   });
// })

module.exports = router;
