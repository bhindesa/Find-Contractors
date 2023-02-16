const express = require('express');
const router = express.Router();
const contractorsCtrl = require('../controllers/contractor');

// console.log(contractorsCtrl)
router.post('/signup', contractorsCtrl.signup);
router.post('/login', contractorsCtrl.login);


module.exports = router;