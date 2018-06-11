const User = require('../models/user');
const Doctor = require('../models/doctor');
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
    let errors = [];
    if (req.body.fName.trim() == "" || req.body.fName == undefined) {
        errors.push("Введіть ім'я");
    }
    if (req.body.sName.trim() == "" || req.body.sName == undefined) {
        errors.push("Введіть прізвище");
    }
    if (req.body.mName.trim() == "" || req.body.mName == undefined) {
        errors.push("Введіть по-батькові");
    }
    if (req.body.type.trim() == "" || req.body.type == undefined) {
        errors.push("Введіть фах");
    }
    if (req.body.hospital.trim() == "" || req.body.hospital == undefined) {
        errors.push("Введіть лікарню, в якій ви працюєте");
    }
    if (req.body.email.trim() == "" || req.body.email == undefined) {
        errors.push("Введіть email");
    } else {
        if (!/\w+@\w+\.\w/i.test(req.body.email)) {
            errors.push('Неправильний формат email');
        }
    }
    if (req.body.password.trim() == "" || req.body.password == undefined) {
        errors.push("Введіть пароль");
    } else {
        if (req.body.password.length < 6) {
            errors.push("Довжина пароля має бути не менше 6 символів");
        }
    }
    if (errors.length > 0) {
        res.send({status: 403, errors:errors});
    } else {
        let hashedPassw = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        const us = await User.create({
            firstname: req.body.fName, 
            lastname: req.body.sName, 
            middlename: req.body.mName, 
            email: req.body.email, 
            password: hashedPassw,
            type: 'doctor'
        });
        await Doctor.create({
            user_id: us._id,
            type: req.body.type,
            hospital: req.body.hospital
        });
        res.send({status: 200, success: "OK"});
    }
}