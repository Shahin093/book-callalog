import express from "express";
import { BookController } from "./book.controller";

const router = express.Router();

router.get("/:id", BookController.getByIdFromDB);
router.get("/:categoryId/category", BookController.getByCategoryIdFromDB);
router.post("/create-book", BookController.insertInToDB);

export const BookRoutes = router;
