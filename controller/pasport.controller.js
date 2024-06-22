const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const Pasport = require('../models/pasport.model')


// create new pasport danni 
exports.create = asyncHandler(async (req, res, next) => {
    const {workers} = req.body 
    if(!workers || workers.length < 1){
        return next(new ErrorResponse('sorovlar bosh qolishi mumkin emas', 403))        
    }
    for(let worker of workers){
        if(!worker.FIOlotin || !worker.FIOkril || !worker.selectRank || !worker.selectRankSumma || !worker.selectRegion || !worker.selectOtryad){
            return next(new ErrorResponse('sorovlar bosh qolishi mumkin emas', 403))
        }
    }
    for(let worker of workers){
        await Pasport.create({
            FIOlotin: worker.FIOlotin,
            FIOkril: worker.FIOkril,
            selectRank: worker.selectRank,
            selectRankSumma: worker.selectRankSumma,
            selectRegion: worker.selectRegion,
            selectOtryad: worker.selectOtryad,
            parent: req.user.id 
        })
    }
    return res.status(201).json({
        success: true, 
        data: "Kiritildi"
    })
})

// get all workers 
exports.getAllworker = asyncHandler(async (req, res, next) => {
    const workers = await Pasport.find({parent: req.user.id})
    return res.status(200).json({
        success: true, 
        data: workers
    })
})

// update worker 
exports.updateWorker = asyncHandler(async (req, res, next) => {
    const { FIOlotin, FIOkril, selectRank, selectRankSumma, selectRegion, selectOtryad } = req.body
    if(!FIOlotin || !FIOkril || !selectRank  || !selectRankSumma || !selectRegion || !selectOtryad){
        return next(new ErrorResponse('sorovlar bosh qolishi mumkin emas', 403))
    }
    const updateWorker = await Pasport.findByIdAndUpdate(req.params.id, {
        FIOlotin,  
        FIOkril, 
        selectRank, 
        selectRankSumma, 
        selectRegion, 
        selectOtryad
    }, {new : true})
    return res.status(200).json({
        success: true,
        data: updateWorker
    })
})

// delete worker
exports.deleteWorker = asyncHandler(async (req, res, next) => {
    const worker = await Pasport.findByIdAndDelete(req.params.id)
    return res.status(200).json({
        success: true,
        data: "Delete"
    })
})