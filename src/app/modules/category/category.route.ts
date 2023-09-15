import express from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.get("/", CategoryController.getAllDataFromDB);
router.get("/:id", CategoryController.getByIdFromDB);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateFromDB
);

router.delete("/:id", CategoryController.deleteFromDB);

router.post(
  "/create-category",
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.insertInToDB
);

export const CategoryRoutes = router;
