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


router.get('/', (req, res) => {
  console.log(req);
    connection.query('SELECT * FROM `quotes`', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving quotes from database');
      } else {
        res.json(result);
      }
    });
  });

router.get('/:id', (req, res) => {
const userId = req.params.id;
connection.query(
    'SELECT * FROM `quotes` WHERE `author` = ?',
    [userId],
    (err, results) => {
    if (err) {
        res.status(500).send('Error retrieving user from database');
    } else {
        if (results.length) res.json(results);
        else res.status(404).send('User not found');
    }
    }
);
}); 

module.exports = router;