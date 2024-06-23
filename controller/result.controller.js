const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const Worker = require('../models/pasport.model')
const Contract = require('../models/contract.model')

// result page 
exports.result = asyncHandler(async (req, res, next) => {
    const result = []
    const contracts = await Contract.find({parent: req.user.id}).populate("workers.worker")
    console.log(contracts)
    return res.status(200).json({
        success: true,
        data: contracts
    })
    
})