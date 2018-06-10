const jwt = require('jsonwebtoken');

module.exports = {
    checkAuth: (req, res, next) => {
        const bHeader = req.headers['authorization'];
        if (bHeader != undefined) {
            const bearer = bHeader.split(' ');
            const token = bearer[1];
            if (token != '') {
                next();
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
    },
    checkAdmin: (req, res, next) => {
        const bHeader = req.headers['authorization'];
        if (bHeader != undefined) {
            const bearer = bHeader.split(' ');
            const token = bearer[1];
            const decoded = jwt.verify(token, 'secretkey');
            if (token != '' && decoded.type == 'admin') {
                next();
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }        
    }
}