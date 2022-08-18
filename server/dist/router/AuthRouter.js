"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthServices_1 = __importDefault(require("../service/AuthServices"));
const authJwt = require('../middleware/AuthJwt');
const router = require("express").Router();
router.post('/auth/', AuthServices_1.default.loginUsers);
router.post('/checkusers/', [authJwt.verifyToken], AuthServices_1.default.CheckUsers);
router.post('/refresh_token/', AuthServices_1.default.refreshToken);
exports.default = router;
//# sourceMappingURL=AuthRouter.js.map