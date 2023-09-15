import express from "express";
import { UserController } from "./user.controlle";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.get("/", UserController.getAllDataFromDB);
router.get("/:id", UserController.getByIdFromDB);
router.delete("/:id", UserController.deleteUser);
router.patch("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.updateUser);

export const UserRoutes = router;
