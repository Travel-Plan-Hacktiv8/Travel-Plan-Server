const express = require('express')
const router = express.Router()
const TravelController = require('../controllers/travelController')
const authorization = require('../middlewere/authorization')

router.post('/', TravelController.add)
router.get('/', TravelController.display)
router.get('/:id', authorization, TravelController.getById)
router.put('/:id', authorization, TravelController.update)
router.delete('/:id', authorization, TravelController.delete)

module.exports = router