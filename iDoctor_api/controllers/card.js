const jwt = require('jsonwebtoken');
const Card = require('../models/card');

exports.create = async (req, res) => {
    const decoded = jwt.verify(req.headers['authorization'].split(' ')[1], 'secretkey');
    await Card.create({
        user_id: decoded.user
    });
    res.send({status: 200});
}