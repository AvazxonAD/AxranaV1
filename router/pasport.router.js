const {Router} = require('express')
const router = Router()

const {protect} = require('../middleware/auth')

const {
    create,
    getAllworker
} = require('../controller/pasport.controller')

router.post('/create', protect, create)
router.get('/get', protect, getAllworker)

module.exports = router

