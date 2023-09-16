import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { OrderService } from "./order.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const insertInToDB = catchAsync(async (req: Request, res: Response) => {
  console.log("body: ", req.body);
  const userId = (req as any).user.userId;
  console.log("user", userId);
  const { orderedBooks } = req.body;

  const result = await OrderService.insertInToDB(userId, orderedBooks);
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllFromDB();
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders gets successfully",
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { orderId } = req.params;
  const result = await OrderService.getByIdFromDB(userId, orderId);
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order fetch successfully",
    data: result,
  });
});

export const OrderController = {
  insertInToDB,
  getAllFromDB,
  getByIdFromDB,
};
