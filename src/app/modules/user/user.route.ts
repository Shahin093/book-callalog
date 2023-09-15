import express from "express";
import { UserController } from "./user.controlle";

const router = express.Router();

router.get("/", UserController.getAllDataFromDB);
router.get("/:id", UserController.getByIdFromDB);
router.delete("/:id", UserController.deleteUser);
router.patch("/:id", UserController.updateUser);

export const UserRoutes = router;
