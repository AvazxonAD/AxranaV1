const {Router} = require('express')
const router = Router()

const {protect} = require('../middleware/auth')

const {
    create,
    getById,
    getAllContract,
    update,
    deleteContract
} = require('../controller/contract.controller')

router.post('/create', protect,  create)
router.get('/get/:id', protect, getById)
router.get("/get", protect, getAllContract)
router.put('/update/:id', protect, update)
router.delete("/delete/:id", protect, deleteContract)

module.exports = router

