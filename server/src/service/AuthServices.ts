import "dotenv/config";
import { Response, Request } from 'express';
import argon2 from "argon2";
import { getRepository } from 'typeorm';
import { Users } from '../entities/UserEntities';
import { Token } from '../entities/TokenEntities';
import { createRefreshToken, createAccessToken } from "../Auth";
import { CostomRequest } from "../CostomRequest";
import jwt from "jsonwebtoken";

class AuthServices {

    static loginUsers = async (req: Request, res: Response) => {
        const user = new Users()

        user.email = req.body.email
        user.password = req.body.password

        const CheckUser = getRepository(Users);
        const validUSers = await CheckUser.findOne({ where:
            { email: user.email }
        });
        const users = await getRepository(Users)
        .createQueryBuilder('users')
        .leftJoinAndSelect("users.roles", "roles")
        .leftJoinAndSelect("users.token", "token") 
        .where('users.email = :email', { email: user.email  })
        .getOne();  
        //console.log(users)

        if(!user){
            res.status(501).json({ 
                message: "Email and Password cannot be empty" 
            });
        }else if(!user.email){
            res.status(501).json({
                message: "Email cannot be empty" 
            });
        }else if(!user.password){
            res.status(501).json({ 
                message: "Password cannot be empty" 
            });
        }else{
            if(validUSers){
                const validPassword = await argon2.verify(validUSers.password, user.password);
                if(validPassword){
                        const ChecToken = getRepository(Token);
                        const tokenUser = await ChecToken.findOne({ where:
                            { id_users: validUSers.id_users }});
                        if(!tokenUser?.accessToken){
                            await getRepository(Token).save({
                                id_users: validUSers.id_users,
                                accessToken: createAccessToken(validUSers),
                                refreshToken: createRefreshToken(validUSers)
                            });
                        }else{
                            await getRepository(Token)
                            .createQueryBuilder()
                            .update(Token)
                            .set({
                                accessToken: createAccessToken(validUSers),
                                refreshToken: createRefreshToken(validUSers)
                            })
                            .where("id_users = :id_users", {id_users: validUSers.id_users})
                            .execute();
                        }
                    }else{
                        res.status(505).json({ message: "Password Incorect" });
                    }
                    res.cookie('token',createAccessToken(validUSers));
                    res.status(200).json({
                        accessToken: createAccessToken(validUSers),
                        refreshTOken: createRefreshToken(validUSers),
                        users
                    });
            }else{
                res.status(505).json({ message: "Email and Password Not Fount" });
            }
        }
    }

    static refreshToken = async (req: Request, res: Response) => {
        const token = new Token()
        token.refreshToken = req.body.refreshToken

        const Id = jwt.decode(token.refreshToken);
        const reqId = req as CostomRequest;
        reqId.userId = Id.userId;
        const checkId = getRepository(Users);
        const checkIdToken = await checkId.findOne({ where:
            { id_users: reqId.userId }
        });

        if(!token){
            res.status(501).json({
                message: "Token cannot be empty" 
            });
        }

        if(checkIdToken){
            const refreshTokenId  = getRepository(Token);
            const TokenRefresh = await refreshTokenId.findOne({ where:
                { refreshToken: token.refreshToken }
            });
            if(!TokenRefresh?.refreshToken){
                res.status(501).json({
                    message: "Token Not Found In database" 
                });
            }else{
                await getRepository(Token)
                .createQueryBuilder()
                .update(Token)
                .set({
                    accessToken: createAccessToken(checkIdToken),
                    refreshToken: createRefreshToken(checkIdToken)
                })
                .where("id_users = :id_users", {id_users: reqId.userId})
                .execute();
                res.status(200).json({
                    accessToken: createAccessToken(checkIdToken),
                    refreshTOken: createRefreshToken(checkIdToken),
                });
            }
        }
    }

    static CheckHomeAdmin = async (req: Request, res: Response,) => {
        const reqId = req as CostomRequest;
        const checkUSersData = await getRepository(Users)
        .createQueryBuilder('users')
        .leftJoinAndSelect("users.roles", "roles")
        .leftJoinAndSelect("users.token", "token")
        .where('users.id_users = :id_users', { id_users:  reqId!.userId })
        .getOne();  
        if(checkUSersData){
            res.status(200).json({
                status: true,
                message: "success",
                data: {
                    data: checkUSersData
                }
            })
        }else{
            res.status(400).json({
                status: false,
                message: "Users Can't Be Found"
            })
        }
    }

    static CheckHomeUsers = async (req: Request, res: Response,) => {
        const reqId = req as CostomRequest;
        const checkUSersData = await getRepository(Users)
        .createQueryBuilder('users')
        .leftJoinAndSelect("users.roles", "roles")
        .leftJoinAndSelect("users.token", "token")
        .where('users.id_users = :id_users', { id_users:  reqId!.userId })
        .getOne();  
        if(checkUSersData){
            res.status(200).json({
                status: true,
                message: "success",
                data: {
                    data: checkUSersData
                }
            })
        }else{
            res.status(400).json({
                status: false,
                message: "Users Can't Be Found"
            })
        }
    }
}


export default AuthServices;