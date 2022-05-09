const connection = require('../db-config');
const router = require('express').Router();
const session = require('express-session');
const path = require('path');

router.use(session({
  secret: "secret",
  resave: true,
saveUninitialized: true
}));

// MY PROFILE

router.get('/', (req, res) => {
    const userId = 3;
    console.log("My profile requested")
    connection.query(
        'SELECT * FROM user_profiles WHERE id = ?',
        [userId],
        (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving user from database');
        } else {
          console.log(results);
            if (results.length) res.json(results[0]);
            else res.status(404).send('User not found');
        }
        }
    );
    }); 
  
    module.exports = router;