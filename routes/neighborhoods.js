var express = require('express');
var request = require('request');
var knex = require('../db/knex.js');
var router = express.Router();

function Neighborhoods() {
   return knex('neighborhoods');
}

// list all neighborhoods
// var epicenters = [];
//
// router.get('/neighborhoods', function(req, res, next) {
//   Neighborhoods().select().then(function(results){
//     for (var i = 0; i < results.length; i++) {
//       var google_api = "https://maps.googleapis.com/maps/api/geocode/json?address=";
//       var address = (results[i].center).replace(/ /g, "+");
//       var my_key = "&key=AIzaSyBWq3Gz3IlIWdXeKYBlNubGRBWd-ENdIno";
//       request(google_api+address+my_key, function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//           var jase = JSON.parse(body);
//           epicenters.push(jase.results[0].geometry.location);
//         }
//       })
//     }).then(function(results){
//   res.render('neighborhoods/index', {neighborhoods: results, locations: epicenters});
//   });
// });


router.get('/neighborhoods', function(req, res, next) {
  Neighborhoods().select().then(function(results){
    res.render('neighborhoods/index', {neighborhoods: results});
  });
});

// new neighborhood page

router.get('/neighborhoods/new', function(req, res, next) {
  res.render('neighborhoods/new');
});

// add new neighborhood

router.post('/neighborhoods', function(req, res, next) {
  Neighborhoods().insert(req.body).then(function(result){
    res.redirect('/neighborhoods/');
  });
});

// show neighborhood

router.get('/neighborhoods/:id', function(req, res, next) {
  Neighborhoods().where('id', req.params.id).then(function(result){
    var google_api = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    var address = (result[0].center).replace(/ /g, "+");
    console.log(req.params.id);
    console.log(address);
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

// edit neighborhood

router.get('/neighborhoods/:id/edit', function (req, res) {
  Neighborhoods().where('id', req.params.id).first().then(function(result){
    res.render('neighborhoods/edit', { neighborhood: result });
  });
});

// update - send edit form

router.post('/neighborhoods/:id', function (req, res) {
  Neighborhoods().where('id', req.params.id).update(req.body)
  .then(function(result){
    res.redirect('/neighborhoods');
  });
});

// delete a neighborhood

router.get('/neighborhoods/:id/delete', function (req, res) {
  Neighborhoods().where('id', req.params.id).del()
  .then(function (result) {
    res.redirect('/neighborhoods');
  });
});

module.exports = router;
