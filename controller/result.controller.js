const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const Worker = require('../models/pasport.model')
const Contract = require('../models/contract.model')

// result page 
exports.result = asyncHandler(async (req, res, next) => {
    const contracts = await Contract.find({
        parent: req.user.id,
    }).sort({ createdAt: 1 }).select("-_id -parent -createdAt -updatedAt -__v");
    
    const promises = contracts.map(async (contract) => {
        const result = [];
        for (let id of contract.workers) {
            let worker = null
            if(req.query.query === 'uz'){
                worker = await Worker.findById(id.worker).select("-_id -FIOkril")
            }
            if(req.query.query === 'ru'){
                worker = await Worker.findById(id.worker).select("-_id -FIOlotin")
            }
            result.push({
                FIOlotin: worker.FIOlotin, 
                FIOkril: worker.FIOkril,
                rank: worker.selectRank,
                rankSumma: worker.selectRankSumma,
                region: worker.selectRegion,
                otryad: worker.selectOtryad,
                contractNumber: contract.contractNumber,
                phone: contract.phone,
                contractDate: contract.contractDate,
                contractTurnOffDate: contract.contractTurnOffDate,
                contractsumma: contract.contractSumma,
                content: contract.content,
                name: contract.name,
                inn: contract.inn,
                address: contract.address,
                accountNumber: contract.accountNumber,
                bankName: contract.bankName,
                dayOrhour: id.dayOrHour,
                timeType: id.timeType,
                boss: contract.boss
            });
        }
        return result;
    });

    const allResults = await Promise.all(promises);

    const result = allResults.flat(); 

    res.status(200).json({
        success: true,
        data: result
    });
})
 
// filter data 
exports.filter = asyncHandler(async (req, res, next) => {
    let {date1, date2} = req.body
    if(!date1 || !date2){
        return next(new ErrorResponse('sorovlar bosh qolishi mumkin emas', 403))
    }
    date1 = new Date(date1)
    date2 = new Date(date2)
    if(isNaN(date1) || isNaN(date2)){
        return next(new ErrorResponse("sana formati notogri", 403))
    }
    const contracts = await Contract.find({
        parent: req.user.id,
        contractDate: {$gte: date1, $lte: date2}
    }).sort({ createdAt: 1 }).select("-_id -parent -createdAt -updatedAt -__v");

    const promises = contracts.map(async (contract) => {
        const result = [];
        for (let id of contract.workers) {
            let worker = null
            if(req.query.query === 'uz'){
                worker = await Worker.findById(id.worker).select("-_id -FIOkril")
            }
            if(req.query.query === 'ru'){
                worker = await Worker.findById(id.worker).select("-_id -FIOlotin")
            }
            result.push({
                FIOlotin: worker.FIOlotin,
                FIOkril: worker.FIOkril,
                rank: worker.selectRank,
                rankSumma: worker.selectRankSumma,
                region: worker.selectRegion,
                otryad: worker.selectOtryad,
                contractNumber: contract.contractNumber,
                phone: contract.phone,
                contractDate: contract.contractDate,
                contractTurnOffDate: contract.contractTurnOffDate,
                contractsumma: contract.contractSumma,
                content: contract.content,
                name: contract.name,
                inn: contract.inn,
                address: contract.address,
                accountNumber: contract.accountNumber,
                bankName: contract.bankName,
                dayOrhour: id.dayOrHour,
                timeType: id.timeType,
                boss: contract.boss
            });
        }
        return result;
    });

    const allResults = await Promise.all(promises);

    const result = allResults.flat(); 

    res.status(200).json({
        success: true,
        data: result
    });    
})
// create excel 
exports.excelCreate = asyncHandler(async (req, res, next) => {
    const {json_data} = req.body
    
})
