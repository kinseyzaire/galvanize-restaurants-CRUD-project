var express = require('express');
var request = require('request');
var knex = require('../db/knex.js');
var router = express.Router();

function Neighborhoods() {
   return knex('neighborhoods');
}

// list all neighborhoods

// router.get('/neighborhoods', function(req, res, next) {
//   Neighborhoods().select().then(function(result){
//         // console.log(jase.results[0].geometry.location);
//         res.render('neighborhoods/index', {neighborhood: result, location: epicenter});
//       }
//     })
//   });
// });

// list a single neighborhood

router.get('/neighborhoods/:id', function(req, res, next) {
  Neighborhoods().where('id', req.params.id).then(function(result){
    console.log(result[0]);
    var google_api = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    var address = (result[0].center).replace(/ /g, "+");
    var my_key = "&key=AIzaSyBWq3Gz3IlIWdXeKYBlNubGRBWd-ENdIno";
    var nresult = result[0];
    request(google_api+address+my_key, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var jase = JSON.parse(body);
        var epicenter = jase.results[0].geometry.location;
        var latitude = epicenter.lat*1;
        var longitude = epicenter.lng*1;
        res.render('neighborhoods/show', {neighborhood: nresult, latitude: latitude, longitude: longitude});
      }
    })
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
