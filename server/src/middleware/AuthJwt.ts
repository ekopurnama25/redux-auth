import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from 'express';
import { CostomRequest } from "../CostomRequest";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const token = req.headers["authorization"];
        if (!token) {
          throw new Error("not authenticated");
        }
        const authtoken = token.split(" ")[1];

        if(token){
            const user = jwt.verify(authtoken, process.env.ACCESS_TOKEN_SECRET!);
            const reqId = req as CostomRequest;
            reqId.userId = user.userId;
        }else{
            return res.status(400).json({
                "errors": [
                    {
                        "msg": "Token invalid",
                    }
                ]
            })
        }
        return next();

    }catch(error){
        return res.status(401).json({
            status: false, 
            message: "Your session is not valid.", 
            data: error
        });
    }
}

const authJwt = {
    verifyToken,
};
module.exports = authJwt;