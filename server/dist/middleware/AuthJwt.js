"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            throw new Error("not authenticated");
        }
        const authtoken = token.split(" ")[1];
        if (token) {
            const user = jsonwebtoken_1.default.verify(authtoken, process.env.ACCESS_TOKEN_SECRET);
            const reqId = req;
            reqId.userId = user.userId;
        }
        else {
            return res.status(400).json({
                "errors": [
                    {
                        "msg": "Token invalid",
                    }
                ]
            });
        }
        return next();
    }
    catch (error) {
        return res.status(401).json({
            status: false,
            message: "Your session is not valid.",
            data: error
        });
    }
};
const authJwt = {
    verifyToken,
};
module.exports = authJwt;
//# sourceMappingURL=AuthJwt.js.map