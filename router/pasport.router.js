const {Router} = require('express')
const router = Router()

const {protect} = require('../middleware/auth')

const {
    create,
    getAllworker,
    updateWorker,
    deleteWorker,
    forPage
} = require('../controller/pasport.controller')

router.post('/create', protect, create)
router.get('/get', protect, getAllworker)
router.put('/update/:id', protect, updateWorker)
router.delete("/delete/:id", protect, deleteWorker)
router.get('/for/page', protect, forPage)

module.exports = router

