const {Router} = require('express')
const router = Router()

const {protect} = require('../middleware/auth')

const {
    result
} = require('../controller/result.controller')

router.get("/get", protect, result)

module.exports = router

