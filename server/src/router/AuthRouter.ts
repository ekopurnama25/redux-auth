import AuthServices  from "../service/AuthServices"; 
const authJwt  = require('../middleware/AuthJwt');

const router = require("express").Router();

router.post('/auth/', AuthServices.loginUsers);

router.post('/checkusers/',  [authJwt.verifyToken] , AuthServices.CheckUsers);

router.post('/refresh_token/', AuthServices.refreshToken);

export default router; 