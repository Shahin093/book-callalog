import express from "express";
import { UserController } from "./user.controlle";

const router = express.Router();

router.post("/signup", UserController.insertInToDB);

export const UserRoutes = router;
