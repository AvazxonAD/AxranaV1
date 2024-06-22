const {Router} = require('express')
const router = Router()

const {protect} = require('../middleware/auth')

const {
    create 
} = require('../controller/pasport.controller')

router.post('/create', protect, create)

module.exports = router

