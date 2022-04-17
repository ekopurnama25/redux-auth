"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const RolesEntities_1 = require("../entities/RolesEntities");
const IsAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqId = req;
    const CheckRoles = typeorm_1.getRepository(RolesEntities_1.Roles);
    const validRoles = yield CheckRoles.findOne({ where: { id_users: reqId.userId }
    });
    if (validRoles) {
        for (let i = 0; i < 1; i++) {
            if (validRoles.roles === "Admin") {
                next();
                return;
            }
            else {
                res.status(403).send({
                    message: "Require Admin Role!"
                });
                return;
            }
        }
    }
    else {
        res.status(403).send({
            message: "Require Admin Role!"
        });
        return;
    }
});
const IsUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqId = req;
    const CheckRoles = typeorm_1.getRepository(RolesEntities_1.Roles);
    const validRoles = yield CheckRoles.findOne({ where: { id_users: reqId.userId }
    });
    if (validRoles) {
        for (let i = 0; i < 1; i++) {
            if (validRoles.roles === "Users") {
                next();
                return;
            }
            else {
                res.status(403).send({
                    message: "Require Admin Role!"
                });
                return;
            }
        }
    }
    else {
        res.status(403).send({
            message: "Require Admin Role!"
        });
        return;
    }
});
const authRoles = {
    IsAdmin,
    IsUsers
};
module.exports = authRoles;
//# sourceMappingURL=AuthRoles.js.map