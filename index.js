var express = require( 'express' );
var mongodb = require( 'mongodb' );
var path = require( 'path' );
var mongo = mongodb.MongoClient;
var mongoUserPsw = process.env.MONGO_USER_PSW;
var app = express();
var url = 'mongodb://' +
  mongoUserPsw +
  '@ds011725.mlab.com:11725/fcc-image-search-abstraction-layer'


mongo.connect( url, function( err, db ) {
  if (err) {
    console.log( 'Unable to connect to database' );
    throw err;
  }
  console.log( 'Successfully connected to the database' );

  // Pass db with each request
  app.use( function( req, res, next ) {
    req.db = db;
    next();
  });

  app.use( express.static( path.join( __dirname , '/public' )));

  // Use the routes specified in the routes file
  app.use( require( './routes' ));
  app.set( 'port', ( process.env.PORT || 5000 ));
  app.set( 'views', path.join( __dirname, '/views' ));
  app.set( 'view engine', 'ejs' );

  // Start node server
  app.listen( app.get( 'port' ), function() {
    console.log( 'Node server is running on port ' + app.get( 'port' ));
  });

});
