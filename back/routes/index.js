const router = require('express').Router();

const registerRoute = require('./register');
const loginRoute = require('./login');
const secureRoute = require('./secure');

router.use('/register', registerRoute);
router.use('/login', loginRoute);
router.use('/secure', secureRoute);

module.exports = router;
