const express = require('express');
const router = express.Router();
const contractorsCtrl = require('../controllers/contractor');

// console.log(contractorsCtrl)
router.post('/signup', contractorsCtrl.signup);
router.post('/login', contractorsCtrl.login);
router.get('/:contractor_id', contractorsCtrl.getOneContractor);
router.post('/addReview', contractorsCtrl.addContractorReview);
router.put('/updateContractor', contractorsCtrl.updateContractor);
router.delete('/deleteContractor', contractorsCtrl.deleteContractor);


module.exports = router;