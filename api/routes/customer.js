const express = require('express');
const router = express.Router();

const customersCtrl = require('../controllers/customer');

router.get('/signup', customersCtrl.createCustomer);
// router.get('/:searchItem/', puppiesCtrl.searchPuppy);



module.exports = router