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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const argon2_1 = __importDefault(require("argon2"));
const typeorm_1 = require("typeorm");
const UserEntities_1 = require("../entities/UserEntities");
const TokenEntities_1 = require("../entities/TokenEntities");
const Auth_1 = require("../Auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthServices {
}
AuthServices.loginUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new UserEntities_1.Users();
    user.email = req.body.email;
    user.password = req.body.password;
    const CheckUser = typeorm_1.getRepository(UserEntities_1.Users);
    const validUSers = yield CheckUser.findOne({ where: { email: user.email }
    });
    const users = yield typeorm_1.getRepository(UserEntities_1.Users)
        .createQueryBuilder('users')
        .leftJoinAndSelect("users.roles", "roles")
        .leftJoinAndSelect("users.token", "token")
        .where('users.email = :email', { email: user.email })
        .getOne();
    if (!user) {
        res.status(501).json({
            message: "Email and Password cannot be empty"
        });
    }
    else if (!user.email) {
        res.status(501).json({
            message: "Email cannot be empty"
        });
    }
    else if (!user.password) {
        res.status(501).json({
            message: "Password cannot be empty"
        });
    }
    else {
        if (validUSers) {
            const validPassword = yield argon2_1.default.verify(validUSers.password, user.password);
            if (validPassword) {
                const ChecToken = typeorm_1.getRepository(TokenEntities_1.Token);
                const tokenUser = yield ChecToken.findOne({ where: { id_users: validUSers.id_users } });
                if (!(tokenUser === null || tokenUser === void 0 ? void 0 : tokenUser.accessToken)) {
                    yield typeorm_1.getRepository(TokenEntities_1.Token).save({
                        id_users: validUSers.id_users,
                        accessToken: Auth_1.createAccessToken(validUSers),
                        refreshToken: Auth_1.createRefreshToken(validUSers)
                    });
                }
                else {
                    yield typeorm_1.getRepository(TokenEntities_1.Token)
                        .createQueryBuilder()
                        .update(TokenEntities_1.Token)
                        .set({
                        accessToken: Auth_1.createAccessToken(validUSers),
                        refreshToken: Auth_1.createRefreshToken(validUSers)
                    })
                        .where("id_users = :id_users", { id_users: validUSers.id_users })
                        .execute();
                }
            }
            else {
                res.status(505).json({ message: "Password Incorect" });
            }
            res.cookie('token', Auth_1.createAccessToken(validUSers));
            res.status(200).json({
                accessToken: Auth_1.createAccessToken(validUSers),
                refreshTOken: Auth_1.createRefreshToken(validUSers),
                users
            });
        }
        else {
            res.status(505).json({ message: "Email and Password Not Fount" });
        }
    }
});
AuthServices.refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = new TokenEntities_1.Token();
    token.refreshToken = req.body.refreshToken;
    const Id = jsonwebtoken_1.default.decode(token.refreshToken);
    const reqId = req;
    reqId.userId = Id.userId;
    const checkId = typeorm_1.getRepository(UserEntities_1.Users);
    const checkIdToken = yield checkId.findOne({ where: { id_users: reqId.userId }
    });
    if (!token) {
        res.status(501).json({
            message: "Token cannot be empty"
        });
    }
    if (checkIdToken) {
        const refreshTokenId = typeorm_1.getRepository(TokenEntities_1.Token);
        const TokenRefresh = yield refreshTokenId.findOne({ where: { refreshToken: token.refreshToken }
        });
        if (!(TokenRefresh === null || TokenRefresh === void 0 ? void 0 : TokenRefresh.refreshToken)) {
            res.status(501).json({
                message: "Token Not Found In database"
            });
        }
        else {
            yield typeorm_1.getRepository(TokenEntities_1.Token)
                .createQueryBuilder()
                .update(TokenEntities_1.Token)
                .set({
                accessToken: Auth_1.createAccessToken(checkIdToken),
                refreshToken: Auth_1.createRefreshToken(checkIdToken)
            })
                .where("id_users = :id_users", { id_users: reqId.userId })
                .execute();
            res.status(200).json({
                accessToken: Auth_1.createAccessToken(checkIdToken),
                refreshTOken: Auth_1.createRefreshToken(checkIdToken),
            });
        }
    }
});
AuthServices.CheckHomeAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqId = req;
    const checkUSersData = yield typeorm_1.getRepository(UserEntities_1.Users)
        .createQueryBuilder('users')
        .leftJoinAndSelect("users.roles", "roles")
        .leftJoinAndSelect("users.token", "token")
        .where('users.id_users = :id_users', { id_users: reqId.userId })
        .getOne();
    if (checkUSersData) {
        res.status(200).json({
            status: true,
            message: "success",
            data: {
                data: checkUSersData
            }
        });
    }
    else {
        res.status(400).json({
            status: false,
            message: "Users Can't Be Found"
        });
    }
});
AuthServices.CheckHomeUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqId = req;
    const checkUSersData = yield typeorm_1.getRepository(UserEntities_1.Users)
        .createQueryBuilder('users')
        .leftJoinAndSelect("users.roles", "roles")
        .leftJoinAndSelect("users.token", "token")
        .where('users.id_users = :id_users', { id_users: reqId.userId })
        .getOne();
    if (checkUSersData) {
        res.status(200).json({
            status: true,
            message: "success",
            data: {
                data: checkUSersData
            }
        });
    }
    else {
        res.status(400).json({
            status: false,
            message: "Users Can't Be Found"
        });
    }
});
exports.default = AuthServices;
//# sourceMappingURL=AuthServices.js.map