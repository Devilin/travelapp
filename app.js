// server.js

	// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb

	// configuration =================

	// Connect to cloud database
	var username = "cheapass"
	var password = "cheapass";
	var address = '@ds039487.mongolab.com:39487/cheapass_db';
	connect();
	// Connect to mongo
	function connect() {
	var url = 'mongodb://' + username + ':' + password + address;
	mongoose.connect(url);
	}
	function disconnect() {mongoose.disconnect()}

	// configuration =================

	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
		app.use(express.methodOverride()); 						// simulate DELETE and PUT
	});

	// define model =================
	var Place = mongoose.model('Place', {
		text : String,
		lat: Number,
		lng: Number
	});

	// routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all places
	app.get('/api/places', function(req, res) {

		// use mongoose to get all places in the database
		Place.find(function(err, places) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(places); // return all places in JSON format
		});
	});

	// create place and send back all places after creation
	app.post('/api/places', function(req, res) {

		// create a place, information comes from AJAX request from Angular
		Place.create({
			text : req.body.text,
			lat: req.body.lat,
			lng: req.body.lng,
			done : false
		}, function(err, place) {
			if (err)
				res.send(err);

			// get and return all the places after you create another
			Place.find(function(err, places) {
				if (err)
					res.send(err)
				res.json(places);
			});
		});

	});

	// delete a place
	app.delete('/api/places/:todo_id', function(req, res) {
		Place.remove({
			_id : req.params.todo_id
		}, function(err, place) {
			if (err)
				res.send(err);

			// get and return all the places after you create another
			Place.find(function(err, places) {
				if (err)
					res.send(err)
				res.json(places);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

	// listen (start app with node server.js) ======================================
	app.listen(3000);
	console.log("App listening on port 3000");
