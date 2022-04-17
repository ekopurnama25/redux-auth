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
const argon2_1 = __importDefault(require("argon2"));
const typeorm_1 = require("typeorm");
const UserEntities_1 = require("../entities/UserEntities");
const RolesEntities_1 = require("../entities/RolesEntities");
class UserServices {
}
UserServices.registrasiUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new UserEntities_1.Users();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = yield argon2_1.default.hash(req.body.password);
    if (!user) {
        res.status(500).json({
            status: false,
            message: "The filling form must be filled out"
        });
    }
    else if (!user.username) {
        res.status(500).json({
            status: false,
            message: "Username cannot be empty"
        });
    }
    else if (!user.email) {
        res.status(500).json({
            status: false,
            message: "Email cannot be empty"
        });
    }
    else if (!user.password) {
        res.status(500).json({
            status: false,
            message: "Password cannot be empty"
        });
    }
    else {
        try {
            const ResultRegis = yield typeorm_1.getRepository(UserEntities_1.Users).save(user);
            if (ResultRegis) {
                const roles = new RolesEntities_1.Roles();
                roles.id_users = ResultRegis.id_users,
                    roles.roles = "Users",
                    roles.status = "Disable";
                yield typeorm_1.getRepository(RolesEntities_1.Roles).save(roles);
            }
            res.status(201).json(ResultRegis);
        }
        catch (err) {
            res.status(401).json({
                status: false,
                message: "Users Can't Be Found"
            });
        }
    }
});
UserServices.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getUsers = yield typeorm_1.getRepository(UserEntities_1.Users)
        .createQueryBuilder('us')
        .innerJoinAndSelect("us.roles", "rl").getMany();
    if (getUsers) {
        res.status(200).json({
            status: true,
            message: "success",
            data: {
                data: getUsers,
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
UserServices.CreateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new UserEntities_1.Users();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = yield argon2_1.default.hash(req.body.password);
    if (!user) {
        res.status(500).json({
            status: false,
            message: "The filling form must be filled out"
        });
    }
    else if (!user.username) {
        res.status(500).json({
            status: false,
            message: "Username cannot be empty"
        });
    }
    else if (!user.email) {
        res.status(500).json({
            status: false,
            message: "Email cannot be empty"
        });
    }
    else if (!user.password) {
        res.status(500).json({
            status: false,
            message: "Password cannot be empty"
        });
    }
    else {
        try {
            const ResultRegis = yield typeorm_1.getRepository(UserEntities_1.Users).save(user);
            if (ResultRegis) {
                const roles = new RolesEntities_1.Roles();
                roles.id_users = ResultRegis.id_users,
                    roles.roles = req.body.roles,
                    roles.status = req.body.status,
                    yield typeorm_1.getRepository(RolesEntities_1.Roles).save(roles);
            }
            res.status(201).json({ users: ResultRegis });
        }
        catch (err) {
            console.log(err);
            res.status(401).json({
                status: false,
                message: "Users Can't Be Found"
            });
        }
    }
});
UserServices.DeleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    new RolesEntities_1.Roles();
    const id = req.params.id;
    const delUsers = yield typeorm_1.getRepository(RolesEntities_1.Roles)
        .createQueryBuilder()
        .delete()
        .from(RolesEntities_1.Roles)
        .where("id_users = :id_users", { id_users: id })
        .execute();
    if (delUsers) {
        new UserEntities_1.Users();
        yield typeorm_1.getRepository(UserEntities_1.Users)
            .createQueryBuilder()
            .delete()
            .from(UserEntities_1.Users)
            .where("id_users = :id_users", { id_users: id })
            .execute();
        res.status(200).json({
            status: true,
            message: "success",
            data: {
                message: "success Delete Users",
                id: id
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
UserServices.getIdUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    new UserEntities_1.Users();
    const id = req.params.id;
    const getUsers = yield typeorm_1.getRepository(UserEntities_1.Users)
        .createQueryBuilder('users')
        .leftJoinAndSelect("users.roles", "roles")
        .where('users.id_users = :id_users', { id_users: id })
        .getOne();
    if (getUsers) {
        res.status(200).json({
            status: true,
            message: "success",
            data: {
                data: getUsers,
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
UserServices.UpdateIdUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new UserEntities_1.Users();
    const roles = new RolesEntities_1.Roles();
    const id = req.params.id;
    user.username = req.body.username;
    user.email = req.body.email;
    roles.roles = req.body.roles;
    roles.status = req.body.status;
    if (user) {
        const UpdateUsers = yield typeorm_1.getRepository(UserEntities_1.Users)
            .createQueryBuilder()
            .update(UserEntities_1.Users)
            .set({
            username: user.username,
            email: user.email,
        })
            .where("id_users = :id_users", { id_users: id })
            .execute();
        if (UpdateUsers) {
            yield typeorm_1.getRepository(RolesEntities_1.Roles)
                .createQueryBuilder()
                .update(RolesEntities_1.Roles)
                .set({
                roles: roles.roles,
                status: roles.status,
            })
                .where("id_users = :id_users", { id_users: id })
                .execute();
        }
        const getUsers = yield typeorm_1.getRepository(UserEntities_1.Users)
            .createQueryBuilder('users')
            .leftJoinAndSelect("users.roles", "roles")
            .where('users.id_users = :id_users', { id_users: id })
            .getOne();
        res.status(200).json({
            status: true,
            message: "success",
            data: {
                data: getUsers,
            }
        });
    }
    else {
        res.status(400).json({
            status: false,
            message: "Cannot File Update Failed"
        });
    }
});
exports.default = UserServices;
//# sourceMappingURL=UsersServices.js.map