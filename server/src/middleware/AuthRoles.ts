import { Response, Request, NextFunction } from 'express';
import { CostomRequest } from "../CostomRequest";
import { getRepository } from 'typeorm';
import { Roles } from '../entities/RolesEntities';

const IsAdmin = async (req: Request, res: Response, next: NextFunction) => {
        const reqId = req as CostomRequest;

        const CheckRoles = getRepository(Roles)
        const validRoles = await CheckRoles.findOne({ where:
            { id_users: reqId.userId }
        });
        //console.log(validRoles);
        if(validRoles){
            for (let i = 0; i < 1; i++) {
                if(validRoles.roles === "Admin") {
                    next();
                    return;
                }else{
                    res.status(403).send({
                        message: "Require Admin Role!"
                    });
                    return;
                }
            }
        }else{
            res.status(403).send({
                message: "Require Admin Role!" 
            });
            return;
    }
}


const IsUsers = async (req: Request, res: Response, next: NextFunction) => {
    const reqId = req as CostomRequest;

    const CheckRoles = getRepository(Roles)
    const validRoles = await CheckRoles.findOne({ where:
        { id_users: reqId.userId }
    });
    //console.log(validRoles);
    if(validRoles){
        for (let i = 0; i < 1; i++) {
            if(validRoles.roles === "Users") {
                next();
                return;
            }else{
                res.status(403).send({
                    message: "Require Admin Role!"
                });
                return;
            }
        }
    }else{
        res.status(403).send({
            message: "Require Admin Role!"
        });
        return;
    }
}

const authRoles = {
    IsAdmin,
    IsUsers
};
module.exports = authRoles;