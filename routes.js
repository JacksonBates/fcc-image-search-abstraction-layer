var express = require('express');
var router = express.Router();

// Homepage for the app
router.get( '/', function(req, res) {
  res.render('pages/home');
});

// Cathces invalid HTTP requests and returns 404
router.get('*', function(req, res) {
  res.status(404);
  res.render('pages/not-found');
  res.end();
});

module.exports = router;
