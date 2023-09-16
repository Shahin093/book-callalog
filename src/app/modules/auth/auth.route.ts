import express from "express";
import { AuthController } from "./auth.controller";
import { UserController } from "../user/user.controlle";

const router = express.Router();

router.post("/signin", AuthController.loginUser);
router.post("/signup", UserController.insertInToDB);

export const AuthRoutes = router;
