const express = require('express')
const router = express.Router()
const apiController= require('../controllers/apiController')

router.get('/:country', apiController.findContentNews)
router.get('/:city', apiController.findContentWeather)
module.exports = router