const mongoose = require('mongoose');

//User Schema
const CardRecordSchema = mongoose.Schema({
    card_id: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    recomendation: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
},{
    versionKey: false
});

const CardRecord = module.exports = mongoose.model('card_records', CardRecordSchema);