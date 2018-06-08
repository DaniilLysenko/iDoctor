const express = require('express');
const router = express.Router();

const UserCntrl = require('../controllers/user');
const PharmacyCntrl = require('../controllers/pharmacy');
const CardCntrl = require('../controllers/card');

const mdlw = require('../middleware/mdlw');

// UserController route-methods

router.post('/user/reg', UserCntrl.reg);
router.post('/user/login', mdlw.checkAuth, UserCntrl.login);
router.get('/user/profile', mdlw.checkAuth, UserCntrl.profile);
router.post('/user/hospital', mdlw.checkAuth, UserCntrl.hospital);

// PharmacyController route-methods

router.post('/pharmacy/near', PharmacyCntrl.near);
router.get('/pharmacy/simptoms', PharmacyCntrl.simptoms);
router.get('/pharmacy/hospital', PharmacyCntrl.hospital);
router.post('/pharmacy/simptoms', PharmacyCntrl.Postsimptoms);
router.post('/pharmacy/appointment', PharmacyCntrl.appointment);

// CardController route-methods

router.post('/card/create-card', mdlw.checkAuth, CardCntrl.create);

module.exports = router;