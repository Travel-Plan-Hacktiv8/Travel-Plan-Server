const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const travelRoute = require('./travel')
const apiRoute = require('./api')
const authentication = require('../middlewere/authentication')

router.use('/user', userRouter)
router.use('/api', apiRoute)
router.use(authentication)
router.use('/travel', travelRoute)

module.exports = router