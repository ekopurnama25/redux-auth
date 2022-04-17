import UserServices from "../service/UsersServices";

const router = require("express").Router();

router.post('/users/', UserServices.registrasiUsers);

router.get('/users/', UserServices.getAllUsers);

router.post('/create/', UserServices.CreateUsers);

router.delete("/users/:id", UserServices.DeleteUsers);

router.get("/users/:id", UserServices.getIdUsers);

router.put("/users/:id", UserServices.UpdateIdUsers);
 
export default router; 