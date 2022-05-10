const connection = require('../db-config');
const router = require('express').Router();
const session = require('express-session');
const path = require('path');
const cors = require('cors');


router.use(cors());

router.use(session({
    secret: "secret",
    resave: true,
  saveUninitialized: true
  }));
  router.use(function (req, res, next) {
    req.session.test = "test";
    next();
  });
  

// LOGIN

router.post('/', function(request, response) {
	// Capture the input fields
	let email = request.body.email;
	let password = request.body.password;
    console.log(request.body);
	// Ensure the input fields exists and are not empty
	if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM `user_profiles` WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.email = email;
                request.session.authId = results[0].id;
        console.log(request.session);
				// Redirect to home page
				// response.redirect('/home');
        response.send(results)
			} else {
				response.send('reject');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

module.exports = router;

