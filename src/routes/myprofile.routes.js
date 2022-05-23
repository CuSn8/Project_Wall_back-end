const connection = require('../db-config');
const router = require('express').Router();
const session = require('express-session');
const path = require('path');
const cors = require('cors');


router.use(cors({
  origin: "http://localhost:3000",
  credentials: true

}));

router.use(session({
  secret: "secret",
  resave: false,
saveUninitialized: false,
rolling: true,
cookie: {
  httpOnly: false,
  sameSite: "lax",
  secure: false
}

}));
router.use(function (req, res, next) {
    req.session.test = "test";
    next();
  });

// MY PROFILE

router.get('/', (req, res) => {
    const userId = req.session.authId;
    console.log("My profile requested")
    console.log(req.session.loggedin);
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