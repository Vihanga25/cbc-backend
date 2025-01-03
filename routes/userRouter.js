import express from "express";

import {getUser , createUser, deleteUser} from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.get("/",getUser)

userRouter.post("/",createUser)

userRouter.delete("/" , deleteUser)

export default userRouter;