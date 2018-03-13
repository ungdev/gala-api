// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'),
  	app        = express(),
  	bodyParser = require('body-parser');
var Client = require('mariasql');

var c = new Client({
  host: '127.0.0.1',
  user: 'arnaud',
  password: 'azerty',
  db: 'GALA'
});



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)


router.get('/', function(req, res) {
    var eventsTable;
    c.query('SELECT * FROM events',
            {},
            function(err, rows) {
      if (err)
        throw err;
      eventsTable = rows;
      res.json(eventsTable); 
      console.log(rows);
    });  
});

router.get('/:event_id', function(req, res) {

    var event;
    c.query('SELECT * FROM events WHERE id=:id',
            {id : req.params.event_id},
            function(err, rows) {
      if (err)
        throw err;
      event = rows;
      res.json(event);   
      console.log(event);
    });

});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
