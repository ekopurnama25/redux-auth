"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersServices_1 = __importDefault(require("../service/UsersServices"));
const router = require("express").Router();
router.post('/users/', UsersServices_1.default.registrasiUsers);
router.get('/users/', UsersServices_1.default.getAllUsers);
router.post('/create/', UsersServices_1.default.CreateUsers);
router.delete("/users/:id", UsersServices_1.default.DeleteUsers);
router.get("/users/:id", UsersServices_1.default.getIdUsers);
router.put("/users/:id", UsersServices_1.default.UpdateIdUsers);
exports.default = router;
//# sourceMappingURL=UserRouter.js.map