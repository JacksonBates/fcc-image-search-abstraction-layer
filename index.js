var express = require( 'express' );
var mongo = require( 'mongodb' );
var path = require( 'path' );

var app = express();

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
