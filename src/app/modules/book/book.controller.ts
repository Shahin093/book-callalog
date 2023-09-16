import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BookService } from "./book.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constants";

const insertInToDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertInToDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book created successfully!",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await BookService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books with  fetched successfully",
    data: result,
  });
});

const getByCategoryIdFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const result = await BookService.getByCategoryIdFromDB(categoryId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Books with associated category data fetched successfully",
      data: result,
    });
  }
);

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book fetched successfully",
    data: result,
  });
});

const updateFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await BookService.updateFromDB(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book deleted successfully",
    data: result,
  });
});

export const BookController = {
  insertInToDB,
  getByCategoryIdFromDB,
  getByIdFromDB,
  updateFromDB,
  deleteFromDB,
  getAllFromDB,
};
