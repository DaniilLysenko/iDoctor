const express = require('express');
const router = express.Router();

const UserCntrl = require('../controllers/user');
const PharmacyCntrl = require('../controllers/pharmacy');

router.post('/user/reg',UserCntrl.reg);
router.post('/user/login',checkAuth,UserCntrl.login);
router.get('/user/profile',checkAuth,UserCntrl.profile);
router.post('/pharmacy/near', PharmacyCntrl.near);
router.get('/pharmacy/simptoms', PharmacyCntrl.simptoms);
router.post('/pharmacy/simptoms', PharmacyCntrl.Postsimptoms);
router.post('/pharmacy/appointment', PharmacyCntrl.appointment);

function checkAuth(req, res, next) {
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
}

module.exports = router;