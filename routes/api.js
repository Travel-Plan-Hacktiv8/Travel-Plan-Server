const express = require('express')
const router = express.Router()
const apiController= require('../controllers/apiController')

router.get('/:city', apiController.findContentWeather)
router.get('/:country', apiController.findContentNews)
module.exports = router