const User = require('../models/user');
const Doctor = require('../models/doctor');
const bcrypt = require('bcrypt');

const webPush = require('web-push');

webPush.setVapidDetails(
    'mailto:drovk199995@gmail.com',
    'BKh5whEbBah9F64msmzVJdsCMJZFvtxc7wNN6S61VFMJWJasxPIjMhtAmrlmPrLgj96EIFU_Gu_5SDRHqnVnjK0', 
    'xu3ONlHwdAF3Wok06awvAL_GMrLnmJM11rwqDG4bgCY'
);

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
            fullname: req.body.sName + ' ' + req.body.fName + ' ' + req.body.mName,
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

exports.patients = async (req, res) => {
    let result = [];
    if (req.query.name != "") {
        let regex = new RegExp(req.query.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim(), "i")
        result = await User.find({fullname: {$regex: regex}, type: 'user'}, 'firstname lastname _id').exec();
    }
    res.send({status: 200,result: result});
}

exports.addRecord = async (req, res) => {
    let errors = [];
    const user = await User.findOne({_id: req.body.id},'push_endpoint push_key_p256dh push_key_auth').exec();
    console.log(user);
    const subscription = {
        endpoint: user.push_endpoint,
        keys: {
          p256dh: user.push_key_p256dh,
          auth: user.push_key_auth
        }
    };
    const payload = JSON.stringify({
        title: 'Запис в карту',
        body: 'Тут якийсь текст, ше нада подумать',
        icon: 'http://www.myiconfinder.com/uploads/iconsets/256-256-76170ff571088c191d2cf8e74e911e11.png'
    });
    const options = {
        TTL: 3600
    };
    webPush.sendNotification(
        subscription, 
        payload,
        options
    )
    .then(() => {
        return res.send({status: 200});
    })
    .catch(err => {
        return res.send({status: 500, err: {err_msg: err}});
    }); 
}