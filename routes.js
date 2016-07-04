var express = require( 'express' );
var router = express.Router();
var imgCliID = process.env.IMGUR_CLIENT_ID;

// Homepage for the app
router.get( '/', function( req, res ) {
  res.render( 'pages/home' );
});

router.get( '/api/imagesearch/:SEARCH',  function( req, res ) {
  var search = req.params.SEARCH;
  console.log(imgCliID);
  res.render( 'pages/search-results', {
    imgCliID: imgCliID,
    search: search
    });
});

// Catches invalid HTTP requests and returns 404
router.get( '*' , function( req, res ) {
  res.status( 404 );
  res.render( 'pages/not-found' );
  res.end();
});

module.exports = router;
