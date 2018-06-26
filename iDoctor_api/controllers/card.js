const jwt = require('jsonwebtoken');
const Card = require('../models/card');

exports.create = async (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey');
    await Card.create({
        user_id: decoded.user
    });
    res.send({status: 200});
}

exports.check = async (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey');
    const card = await Card.findOne({user_id: req.query.id}).exec();
    if (req.query.id == '' && card != null) {
        res.send({status: 200,card: card});
    }
    if (decoded.user == req.query.id && card != null || decoded.type == 'doctor' && card != null) {
        res.send({status: 200,card: card});
    } else {
        res.send({status: 403});
    }
}