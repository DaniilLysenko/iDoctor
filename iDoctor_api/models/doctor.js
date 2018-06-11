const mongoose = require('mongoose');

//User Schema
const DoctorSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        default: ''
    }
},{
    versionKey: false
});

const Doctor = module.exports = mongoose.model('doctors', DoctorSchema);