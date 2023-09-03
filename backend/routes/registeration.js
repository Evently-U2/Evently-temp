const express = require('express')
const router = express.Router()

const controllers = require('../controllers/index')

router.route('/organizer').post(controllers.registeration.organizer)
router.route('/participant').post(controllers.registeration.participant)


module.exports = router