const express = require('express')
const router = express.Router()
const apiController= require('../controllers/apiController')

router.get('/news/:country', apiController.findContentNews)
router.get('/weather/:city', apiController.findContentWeather)
module.exports = router