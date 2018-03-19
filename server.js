require('dotenv').config()

// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Client = require('mariasql');

const c = new Client();
c.connect({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  db: process.env.DB_NAME
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


// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();

router.get('/', function(req, res) {
  if(c.connected){
    var eventsTable;
    c.query('SELECT * FROM events',
            {},
            function(err, rows) {
      if (err){
        console.log(err)
        throw err;
      }
      eventsTable = rows;
      res.json(eventsTable);
    });
  }
  else{
    res.json({'error':'Not Connected'})
  }
    
});

router.get('/:event_id', function(req, res) {
  if(c.connected){
    var event;
    c.query('SELECT * FROM events WHERE id=:id',
            {id : req.params.event_id},
            function(err, rows) {
      if (err){
        console.log(err)
        throw err;
      }
      event = rows;
      res.json(event);
    });
  }
  else{
    res.json({'error':'Not Connected'})
  }

});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(process.env.SERVER_PORT, _ => console.log(`Magic happens on port ${process.env.SERVER_PORT}`));
