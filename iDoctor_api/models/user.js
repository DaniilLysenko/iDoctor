const mongoose = require('mongoose');

//User Schema
const UserSchema = mongoose.Schema({
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
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Number,
        required: true
    },
    hospital: {
        type: String
    }
},{
    versionKey: false
});

UserSchema.virtual('fullname').get(function(){
    return this.lastname + ' ' + this.firstname + ' ' + this.middlename;
});


const User = module.exports = mongoose.model('User', UserSchema);