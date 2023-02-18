const express = require('express');
const router = express.Router();
const contractorsCtrl = require('../controllers/contractor');

// console.log(contractorsCtrl)
router.post('/signup', contractorsCtrl.signup);
router.post('/login', contractorsCtrl.login);
router.get('/:contractor_id', contractorsCtrl.getOneContractor);
router.post('/:contractor_id', contractorsCtrl.updateContractor);
router.post('/addReview', contractorsCtrl.updateContractor);



module.exports = router;