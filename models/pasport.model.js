const mongoose = require('mongoose')

const pasportSchema = new  mongoose.Schema({
    FIOlotin: {
        type: String,
        required: true
    },
    FIOkril: {
        type: String,
        required: true
    },
    selectRank: {
        type: String,
        required: true
    },
    selectRankSumma: {
        type: Number,
        required: true
    },
    seelctRegion: {
        type: String,
        required: true
    },
    selectOtryad: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, 
{timestamps: true}
)

module.exports = mongoose.model('Pasport', pasportSchema)
