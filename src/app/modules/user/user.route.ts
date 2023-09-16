import express from "express";
import { UserController } from "./user.controlle";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllDataFromDB);
router.get("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.getByIdFromDB);
router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);
router.patch("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.updateUser);
router.get(
  "/profile",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  UserController.GetMyProfile
);

export const UserRoutes = router;
