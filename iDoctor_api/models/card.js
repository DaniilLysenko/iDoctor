const mongoose = require('mongoose');

//User Schema
const CardSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        default: Date.now()
    }
},{
    versionKey: false
});

const Card = module.exports = mongoose.model('Card', CardSchema);