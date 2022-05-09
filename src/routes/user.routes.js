const connection = require('../db-config');
const router = require('express').Router();
const session = require('express-session');
const path = require('path');

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

router.post('/auth', function(request, response) {
	// Capture the input fields
	let email = request.body.email;
	let password = request.body.password;
  // console.log(request.body);
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
        // response.session.loggedin = true;
        // response.session.userid = results.id;
        // console.log(request.session);
        // console.log(results[0].id);
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

router.get('/', (req, res) => {
    connection.query('SELECT * FROM user_profiles', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving users from database');
      } else {
        res.json(result);
      }
    });
  });

router.get('/:id', (req, res) => {
const userId = req.params.id;
console.log(req.session.test);
connection.query(
    'SELECT * FROM user_profiles WHERE id = ?',
    [userId],
    (err, results) => {
    if (err) {
        res.status(500).send('Error retrieving user from database');
    } else {
        if (results.length) res.json(results[0]);
        else res.status(404).send('User not found');
    }
    }
);
}); 

router.post('/', (req, res) => {
  const { first_name, last_name, title, family, list_imageUrl, email, password } = req.body;
  connection.query(
    'INSERT INTO `user_profiles` (`first_name`, `last_name`, `title`, `family`, `list_imageUrl`, `email`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [first_name, last_name, title, family, list_imageUrl, email, password],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving user');
      } else {
        const id = result.insertId;
        const createdAnimal = { id, first_name, last_name, title, family, list_imageUrl, email, password };
        res.status(201).json(createdAnimal);
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const db = connection.promise();
  let existingUser = null;
  db.query('SELECT * FROM `user_profiles` WHERE id = ?', [userId])
    .then(([results]) => {
      existingUser = results[0];
      if (!existingUser) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE `user_profiles` SET ? WHERE id = ?', [req.body, userId]);
    })
    .then(() => {
      res.status(200).json({ ...existingUser, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`User with id ${userId} not found.`);
      else res.status(500).send('Error updating user');
    });
});

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM `user_profiles` WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting user');
      } else {
        if (result.affectedRows) res.status(200).send('Userdeleted!');
        else res.status(404).send('User not found.');
      }
    }
  );
});

module.exports = router;