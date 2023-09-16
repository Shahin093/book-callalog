import express from "express";
import { BookController } from "./book.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();
router.get("/", BookController.getAllFromDB);
router.get("/:id", BookController.getByIdFromDB);
router.patch("/:id", auth(ENUM_USER_ROLE.ADMIN), BookController.updateFromDB);
router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), BookController.deleteFromDB);
router.get("/:categoryId/category", BookController.getByCategoryIdFromDB);
router.post("/create-book", BookController.insertInToDB);

export const BookRoutes = router;
