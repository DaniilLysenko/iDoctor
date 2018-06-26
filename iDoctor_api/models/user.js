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
    fullname: {
        type: String,
        default: this.lastname + ' ' + this.firstname + ' ' + this.middlename
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        default: ''
    },
    placeLive: {
        type: String,
        default: ''
    },
    hospital: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'user'
    },
    push_subscribe: {
        type: Boolean,
        default: false
    },
    push_endpoint: {
        type: String,
        default: ''
    },
    push_key_p256dh: {
        type: String,
        default: ''
    },
    push_key_auth: {
        type: String,
        default: ''
    }
},{
    versionKey: false
});

const User = module.exports = mongoose.model('User', UserSchema);