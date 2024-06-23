const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')
const Contract = require('../models/contract.model')

// create conract 
exports.create = asyncHandler(async (req, res, next) => {
    const { contractDate, contractTurnOffDate, contractSumma, content, name, inn, address, accountNumber, bankName, workers } = req.body
    if( !contractDate || !contractTurnOffDate || !contractSumma || !content || !name || !inn || !address ||!accountNumber || !bankName || !workers || workers.length < 1 ){
        return next(new ErrorResponse('sorovlar bosh qolishi mumkin emas', 403))  
    }
    const newContract = await Contract.create({
        contractDate, 
        contractTurnOffDate, 
        contractSumma, 
        content, 
        name, 
        inn, 
        address, 
        accountNumber, 
        bankName, 
        workers,
        parent: req.user.id
    })
    return res.status(200).json({
        success: true,
        data: newContract
    })
})

// get element by id 
exports.getById = asyncHandler(async (req, res, next) => {
    const contract = await Contract.findById(req.params.id)
    return res.status(200).json({
        success: true,
        data: contract
    })
})

// get all contract 
exports.getAllContract = asyncHandler(async (req, res, next) => {
    const contracts = await Contract.find({parent: req.user.id})
    return res.status(200).json({
        success: true,
        data: contracts
    })
})

// update contract
exports.update = asyncHandler(async (req, res,next) => {
    const { contractDate, contractTurnOffDate, contractSumma, content, name, inn, address, accountNumber, bankName, workers } = req.body
    if( !contractDate || !contractTurnOffDate || !contractSumma || !content || !name || !inn || !address ||!accountNumber || !bankName || !workers || workers.length < 1 ){
        return next(new ErrorResponse('sorovlar bosh qolishi mumkin emas', 403))  
    }
    const updateContract = await Contract.findByIdAndUpdate(req.params.id, {
        contractDate, 
        contractTurnOffDate, 
        contractSumma, 
        content, 
        name, 
        inn, 
        address, 
        accountNumber, 
        bankName, 
        workers
    }, {new: true})  
    return res.status(200).json({
        success: true,
        data: updateContract
    })
})

// delete contract 
exports.deleteContract = asyncHandler(async (req, res, next) => {
    await Contract.findByIdAndDelete(req.params.id)
    return res.status(200).json({
        success: true,
        data: "Delete"
    })
})