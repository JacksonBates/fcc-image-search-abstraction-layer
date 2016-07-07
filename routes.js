var express = require( 'express' );
var router = express.Router();
var mongodb = require( 'mongodb' );
var controller = require('./controllers/controller');

// Homepage for the app
router.get( '/', function( req, res ) {
  res.render( 'pages/home' );
});

router.get( '/api/imagesearch/:SEARCH', controller.insertQuery );

router.get( '/api/latest/imagesearch', controller.findQuery );

// Catches invalid HTTP requests and returns 404
router.get( '*' , function( req, res ) {
  res.status( 404 );
  res.render( 'pages/not-found' );
  res.end();
});

module.exports = router;
