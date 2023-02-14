
const express = require('express');
const router = express.Router();

const puppiesCtrl = require('../controllers/puppy');

router.get('/', puppiesCtrl.puppyList);
router.get('/:searchItem/', puppiesCtrl.searchPuppy);



module.exports = router