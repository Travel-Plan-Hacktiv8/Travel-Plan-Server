const express = require('express')
const router = express.Router()
const apiController= require('../controllers/apiController')

router.get('/:city', apiController.findContent)
module.exports = router