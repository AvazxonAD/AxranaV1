const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const Worker = require('../models/pasport.model')
const Contract = require('../models/contract.model')

// result page 
exports.result = asyncHandler(async (req, res, next) => {
    const result = []
    const contracts = await Contract.find({parent: req.user.id}).sort({createdAt: 1}).select("-_id -parent -createdAt -updatedAt -__v")
    for(let contract of contracts){
        let object = {}
        for(let id of contract.workers){
            const worker = await Worker.findById(id.worker)
            object.FIOlotin = worker.FIOlotin
            object.FIOkril = worker.FIOkril
            object.rank = worker.selectRank
            object.rankSumma = worker.selectRankSumma
            object.region = worker.selectRegion
            object.otryad = worker.selectOtryad
            object.contractNumber = contract.contractNumber
            object.phone = contract.phone
            object.contractDate = contract.contractDate
            object.contractTurnOffDate = contract.contractTurnOffDate
            object.contractsumma = contract.contractSumma
            object.content = contract.content 
            object.name = contract.name
            object.inn = contract.inn
            object.address = contract.address
            object.accountNumber = contract.accountNumber
            object.bankName = contract.bankName
            object.dayOrhour = id.dayOrHour
            object.timeType = id.timeType
            object.boss = contract.boss
            result.push(object)
        }
    }
    return res.status(200).json({
        success: true,
        data: result
    })
    
})