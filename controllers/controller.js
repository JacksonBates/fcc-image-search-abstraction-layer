var mongodb = require( 'mongodb' );
var bingKey1 = process.env.BING_KEY_1;
var request = require( 'request' );

module.exports = {

  // GET /api/imagesearch/:SEARCH?offset=[x]
 insertQuery: function ( req, res ) {
   var search = req.params.SEARCH;
   var db = req.db;
   var latest = db.collection( 'latest' );
   var date = new Date();
   var time = date.toISOString();
   latest.insert({
     term: search,
     time: time
   });
   var offset = "";
   if (isNaN(req.query.offset)) {
     offset = '0';
   } else {
     offset = req.query.offset;
   }
   var queryParameters = 'q=' + search +
     '&count=10&offset=' +
     offset +
     '&mkt=en-us&safeSearch=Moderate';
   var options = {
     uri: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?' +
       queryParameters,
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
 },

  // GET /api/latest/imagesearch
  findQuery: function( req, res ) {
    var db = req.db;
    var latest = db.collection( 'latest' );
    latest.find( {}, { '_id': false } ).toArray( function( err, docs ) {
      if ( err ) {
        console.log('Error: unable to find latest searches in database');
      };
      var recentSearches = docs.reverse();
      if ( recentSearches <= 10 ) {
        console.log( recentSearches );
        res.end( JSON.stringify( recentSearches ));
      } else {
        console.log( recentSearches.slice( 0, 10 ));
        res.end( JSON.stringify( recentSearches.slice( 0, 10 )));
      }
    });
  }
};
