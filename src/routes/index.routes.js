const router = require('express').Router();
const usersRouter = require('./user.routes');
const animalsRouter = require('./animal.routes');
const quotesRouter = require('./quotes.routes');
const myProfileRouter = require('./myprofile.routes');
const session = require('express-session');


router.use(session({
    secret: "secret",
    resave: true,
  saveUninitialized: true
  }));
router.use(function (req, res, next) {
    req.session.test = "test";
    next();
  });

router.use('/users', usersRouter);
router.use ('/animals', animalsRouter);
router.use('/quotes', quotesRouter);
router.use('/myprofile', myProfileRouter);

module.exports = router;