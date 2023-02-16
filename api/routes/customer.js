const express = require('express');
const router = express.Router();

const customersCtrl = require('../controllers/customer');

router.post('/login', customersCtrl.login);
router.post('/signup', customersCtrl.signupCustomer);



module.exports = router