const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')
const Rank = require('../models/rank.model')

// create new rank 
exports.createRank = asyncHandler(async (req, res, next) => {
    const {ranks} = req.body
    if(!ranks || ranks.length === 0){
        return next(new ErrorResponse("Sorovlar bosh qolmasligi kerak", 403))
    }
    let date
    for(let rank of ranks){
        if(!rank.name || rank.summa == null){
            return next(new ErrorResponse('Sorovlar bosh qolmasligi kerak', 403))
        }
        const test = await Rank.findOne({name : rank.name.trim(), parent : req.user.id})
        if(test){
            return next(new ErrorResponse(`Bu unvonni oldin kiritgansiz : ${test.name}`,403))
        }
    }
    for(let rank of ranks){
        const now = new Date();
        // Hozirgi yil, oy va kunni olish
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Oylarda 0 dan boshlanganligi uchun 1 qo'shamiz
        const day = String(now.getDate()).padStart(2, '0');
        const createDate = `${year}-${month}-${day}`;

        const newRank = await Rank.create({name : rank.name, summa : rank.summa, parent : req.user.id, date : createDate})
    }
    return res.status(200).json({success : true, data : "Kiritildi"})
})

// get all rank 
exports.getAllRank =asyncHandler(async (req, res, next) => {
    const ranks = await Rank.find({parent : req.user.id}).sort({name : 1})
    return res.status(200).json({success : true, data : ranks})

})
// delete rank
exports.deleteRank = asyncHandler(async (req, res, next) => {
    await Rank.findByIdAndDelete(req.params.id)

    return res.status(200).json({success : true, data : "Delete"})
})

// update rank 
exports.updateRank = asyncHandler(async (req, res, next) => {
    const rank = Rank.findById(req.params.id)
    const {name, summa} = req.body
    if(!name, summa === null){
        return next(new ErrorResponse('sorovlar bosh qolishi mumkin emas', 403))
    }
    const test = await Rank.findOne({name: req.body.name, parent: req.user.id})
    if(test){
        return next(new ErrorResponse(`Bu unvon nomi kiritilgan boshqa nomga ozgartring : ${test.name}`))
    }

    await Rank.findByIdAndUpdate(req.params.id, {
        name: name,
        summa: summa
    }, {new : true})

    return res.status(200).json({success : true, data : "O'zgardi"})
})