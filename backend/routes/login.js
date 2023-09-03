const express = require('express')
const router = express.Router()

const controllers = require('../controllers/index')

router.route('/organizer').post(controllers.login.organizer)
router.route('/participant').post(controllers.login.participant)


module.exports = router