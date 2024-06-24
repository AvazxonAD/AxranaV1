const {Router} = require('express')
const router = Router()

const {protect} = require('../middleware/auth')

const {
    result,
    filter
} = require('../controller/result.controller')

router.get("/get", protect, result)
router.post('/filter', protect, filter)

module.exports = router

