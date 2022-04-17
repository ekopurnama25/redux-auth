import AuthServices  from "../service/AuthServices"; 
const authJwt  = require('../middleware/AuthJwt');
const authRoles = require("../middleware/AuthRoles");

const router = require("express").Router();

router.post('/auth/', AuthServices.loginUsers);

router.post('/admin/',  [authJwt.verifyToken, authRoles.IsAdmin] , AuthServices.CheckHomeAdmin);

router.post('/users/',  [authJwt.verifyToken, authRoles.IsUsers] , AuthServices.CheckHomeUsers);

router.post('/refresh_token/', AuthServices.refreshToken);

export default router; 