import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CategoryService } from "./category.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const insertInToDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.insertInToDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getAllDataFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllDataFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories fetched successfully",
    data: result,
  });
});
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CategoryService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category fetched successfully",
    data: result,
  });
});

export const CategoryController = {
  insertInToDB,
  getAllDataFromDB,
  getByIdFromDB,
};
