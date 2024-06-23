const mongoose = require('mongoose');

// Shakllangan schema
const contractSchema = new mongoose.Schema({
    contractDate: {
        type: Date, // Sanani formatlash
        required: true
    },
    contractTurnOffDate: {
        type: Date, // Sanani formatlash
        required: true
    },
    contractSumma: {
        type: Number,
        required: true,
        min: 0 // Contract summasi ijobiy bo'lishi kerak
    },
    content: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    inn: {
        type: String,
        required: true,
        // minlength: 9,
        // maxlength: 14
    },
    address: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String, // Bank hisob raqami string sifatida saqlanadi
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    workers: [
        {
            username: {
                type: String,
                required: true
            },
            dayOrHour: {
                type: Number,
                required: true
            },
            timeType: {
                type: String,
                required: true
            }
        }
    ],
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

// Modelni eksport qilish
module.exports = mongoose.model("Contract", contractSchema);
