const mongoose = require('mongoose');

//User Schema
const DoctorSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    middlename: {
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
    }
},{
    versionKey: false
});

const Doctor = module.exports = mongoose.model('doctors', DoctorSchema);