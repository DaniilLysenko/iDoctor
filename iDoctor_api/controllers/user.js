const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.reg = async function(req, res) {
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
    if (req.body.email.trim() == "" || req.body.email == undefined) {
        errors.push("Введіть email");
    } else {
        if (!/\w+@\w+\.\w/i.test(req.body.email)) {
            errors.push('Неправильний формат email');
        }
    }
    if (req.body.placeL.trim() == "" || req.body.placeL == undefined) {
        errors.push("Введіть ваше місце проживання");
    }
    if (req.body.birthdayY.trim() == "" || req.body.birthdayY == undefined) {
        errors.push("Введіть вашу повну дату народження");
    } else {
        if (!/^[0-9]{2}\.[0-1]{1}[1-9]{1}\.[1-2]{1}[0]{1}[0-2]{1}[0-9]{1}$/i.test(req.body.birthdayY)) {
            errors.push("Введіть вашу повну дату народження");
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
        res.send({errors:errors});
    } else {
        let hashedPassw = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        const us = await User.create({
            firstname: req.body.fName, 
            lastname: req.body.sName, 
            middlename: req.body.mName, 
            email: req.body.email, 
            password: hashedPassw, 
            birthday: req.body.birthdayY,
            placeLive: req.body.placeL
        });
        res.send({status: 200, success: "OK"});
    }
}

exports.login = async function(req, res) {
    let errors = [];
    const user = await User.findOne({email: req.body.email},'_id password').exec();
    if (req.body.email == "" || req.body.email == undefined) {
        errors.push("Введіть email");
    }
    if (req.body.password == "" || req.body.password == undefined) {
        errors.push("Введіть пароль");
    }
    if (user == null) {
        errors.push("Аккаунт не знайдений");
    } else {
        const match = bcrypt.compareSync(req.body.password, user.password);
        if (!match) {
            errors.push("Пароль неправильний");
        }
    }
    if (errors.length > 0) {
        res.send({errors:errors});
    } else {
        jwt.sign({user: user._id},'secretkey',(err, token) => {
            res.send({success: "OK", token: token});
        });  
    }
}

exports.profile = async function(req, res) {
    try {
        const decoded = jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey');
        const user = await User.findOne({_id: decoded.user}).exec();
        res.send({status: 200, res: user});
    } catch(err) {
        res.send({status: 403});
    }
}

exports.hospital = async function(req, res) {
    if (req.body.hospital == '') {
        res.send({status: 403});
    } else {
        const decoded = jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey');
        User.update({_id: decoded.user},{$set: {hospital: req.body.hospital}}, (err, user) => {
            res.send({status: 200});
        });
    }
}