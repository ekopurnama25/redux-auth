import { Response, Request } from 'express';
import argon2 from "argon2";
import { getRepository } from 'typeorm';
import { Users } from '../entities/UserEntities';
import { Roles } from '../entities/RolesEntities';

class UserServices {

    static registrasiUsers = async (req: Request, res: Response) => {
        const user = new Users()
        user.username = req.body.username
        user.email = req.body.email
        user.password = await argon2.hash(req.body.password);

        if(!user){
            res.status(500).json({
                status: false,
                message: "The filling form must be filled out"
            })
        }else if(!user.username){
            res.status(500).json({
                status: false,
                message: "Username cannot be empty"
            })
        }else if(!user.email){
            res.status(500).json({
                status: false,
                message: "Email cannot be empty"
            })
        }else if(!user.password){
            res.status(500).json({
                status: false,
                message: "Password cannot be empty"
            })
        }else{
            try {
                const ResultRegis = await getRepository(Users).save(user)
                if(ResultRegis){
                    const roles = new Roles()
                    roles.id_users = ResultRegis.id_users,
                    roles.roles = "Users",
                    roles.status = "Disable"
                    await getRepository(Roles).save(roles)
                }
                res.status(201).json(ResultRegis);
            }catch(err){  
                res.status(401).json({
                    status: false,
                    message: "Users Can't Be Found"
                })
            }
        }
    }

    static getAllUsers = async (req: Request, res: Response) => {
        const getUsers = await getRepository(Users)
        .createQueryBuilder('us')
        .innerJoinAndSelect("us.roles", "rl").getMany()
       if(getUsers){
            res.status(200).json({
                status: true,
                message: "success",
                data: {
                    data: getUsers,
                }
            })
        }else{
            res.status(400).json({
                status: false,
                message: "Users Can't Be Found"
            })
        }
    }

    static CreateUsers = async (req: Request, res: Response) => {
        const user = new Users()
        user.username = req.body.username
        user.email = req.body.email
        user.password = await argon2.hash(req.body.password);
        if(!user){
            res.status(500).json({
                status: false,
                message: "The filling form must be filled out"
            })
        }else if(!user.username){
            res.status(500).json({
                status: false,
                message: "Username cannot be empty"
            })
        }else if(!user.email){
            res.status(500).json({
                status: false,
                message: "Email cannot be empty"
            })
        }else if(!user.password){
            res.status(500).json({
                status: false,
                message: "Password cannot be empty"
            })
        }else{
            try {
                const ResultRegis = await getRepository(Users).save(user)
                if(ResultRegis){
                    const roles = new Roles()
                    roles.id_users = ResultRegis.id_users,
                    roles.roles = req.body.roles,
                    roles.status = req.body.status,
                    await getRepository(Roles).save(roles)
                }
                res.status(201).json({users : ResultRegis});
            }catch(err){  
                console.log(err)
                res.status(401).json({
                    status: false, 
                    message: "Users Can't Be Found" 
                })
            }
        }
    }

    static DeleteUsers = async (req: Request, res: Response) => {
        new Roles();
        const id = req.params.id;
        const delUsers = await getRepository(Roles) 
        .createQueryBuilder()
        .delete()
        .from(Roles)
        .where("id_users = :id_users", { id_users: id })
        .execute();
       if(delUsers){
        new Users();  
        await getRepository(Users) 
        .createQueryBuilder()
        .delete()
        .from(Users)
        .where("id_users = :id_users", { id_users: id })
        .execute();
            res.status(200).json({
                status: true,
                message: "success",
                data: {
                    message: "success Delete Users",
                    id: id
                }
            })
        }else{
            res.status(400).json({
                status: false,
                message: "Users Can't Be Found"
            })
        }
    }

    static getIdUsers = async (req: Request, res: Response) => {
        new Users();
        const id = req.params.id; 
        const getUsers = await getRepository(Users)
        .createQueryBuilder('users')
        .leftJoinAndSelect("users.roles", "roles")
        .where('users.id_users = :id_users', { id_users:  id })
        .getOne();  
       if(getUsers){
            res.status(200).json({
                status: true,
                message: "success",
                data: {
                    data: getUsers,
                }
            })
        }else{
            res.status(400).json({
                status: false,
                message: "Users Can't Be Found"
            })
        }
    }

    static UpdateIdUsers = async (req: Request, res: Response) => {
        const user = new Users();
        const roles = new Roles();
        const id = req.params.id;
        user.username = req.body.username
        user.email = req.body.email
        roles.roles = req.body.roles
        roles.status = req.body.status
        if(user){
            const UpdateUsers = await getRepository(Users)
            .createQueryBuilder()
            .update(Users)
            .set({
                username: user.username, 
                email: user.email,
            })
            .where("id_users = :id_users", {id_users: id})
            .execute();
            if(UpdateUsers){
                await getRepository(Roles)
                .createQueryBuilder()
                .update(Roles)
                .set({
                    roles: roles.roles,
                    status: roles.status,
                })
                .where("id_users = :id_users", {id_users: id})
                .execute();
            }
            const getUsers = await getRepository(Users)
            .createQueryBuilder('users')
            .leftJoinAndSelect("users.roles", "roles")
            .where('users.id_users = :id_users', { id_users:  id })
            .getOne();
            res.status(200).json({
                status: true,
                message: "success",
                data: {
                    data: getUsers,
                }
            })
        }else{
            res.status(400).json({ 
                status: false,
                message: "Cannot File Update Failed"
            });
        }
    }
}


export default UserServices;