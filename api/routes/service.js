const express = require('express');
const router = express.Router();
const servicesCtrl = require('../controllers/service');

router.get('/all', servicesCtrl.getAllServices);
router.get('/:serviceId', servicesCtrl.getOneService);
router.post('/addService', servicesCtrl.addService);
router.post('/updateService', servicesCtrl.updateService);
router.delete('/deleteService', servicesCtrl.deleteService);

module.exports = router;