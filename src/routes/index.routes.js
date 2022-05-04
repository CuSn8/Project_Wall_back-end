const router = require('express').Router();
const usersRouter = require('./user.routes');
const animalsRouter = require('./animal.routes');
const quotesRouter = require('./quotes.routes');

router.use('/users', usersRouter);
router.use ('/animals', animalsRouter);
router.use('/quotes', quotesRouter);

module.exports = router;