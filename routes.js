var express = require( 'express' );
var router = express.Router();
var bingKey1 = process.env.BING_KEY_1;
var request = require( 'request' );
// Homepage for the app
router.get( '/', function( req, res ) {
  res.render( 'pages/home' );
});

router.get( '/api/imagesearch/:SEARCH',  function( req, res ) {
  var search = req.params.SEARCH;
  var queryParameters = 'q=' + search + '&count=10&offset=0&mkt=en-us&safeSearch=Moderate'
  var options = {
    uri: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?' + queryParameters,
    headers: {
      'Ocp-Apim-Subscription-Key': bingKey1
      }
    };
  request(options, function( err, response, body ) {
    var json = JSON.parse(body);
    console.log(json.value);
    var arr = [];
    function callback( element, index, array ) {
      arr.push({
        name: element.name,
        url: element.contentUrl,
        thumbnail: element.thumbnailUrl,
        context: element.hostPageDisplayUrl
      });
    };
    json.value.forEach(callback);
    res.end(JSON.stringify(arr));
  });
});

router.get( '/test', function( req, res ) {
  request({ uri: 'http://jacksonbates.wordpress.com' }, function( err, response, body ) {
    if ( err ) {
      throw err;
    }
    //console.log(response);
    console.log(body);
    res.end();
  })
});

// Catches invalid HTTP requests and returns 404
router.get( '*' , function( req, res ) {
  res.status( 404 );
  res.render( 'pages/not-found' );
  res.end();
});

module.exports = router;
