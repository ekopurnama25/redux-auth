"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthServices_1 = __importDefault(require("../service/AuthServices"));
const authJwt = require('../middleware/AuthJwt');
const authRoles = require("../middleware/AuthRoles");
const router = require("express").Router();
router.post('/auth/', AuthServices_1.default.loginUsers);
router.post('/admin/', [authJwt.verifyToken, authRoles.IsAdmin], AuthServices_1.default.CheckHomeAdmin);
router.post('/users/', [authJwt.verifyToken, authRoles.IsUsers], AuthServices_1.default.CheckHomeUsers);
router.post('/refresh_token/', AuthServices_1.default.refreshToken);
exports.default = router;
//# sourceMappingURL=AuthRouter.js.map