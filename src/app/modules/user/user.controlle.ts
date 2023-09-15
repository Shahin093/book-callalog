import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const insertInToDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.insertInToDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

const getAllDataFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllDataFromDB();
  const usersResponseData = result.map(({ password, ...rest }) => rest);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: usersResponseData,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getByIdFromDB(id);
  console.log(result?.password);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User getched successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await UserService.updateUser(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const UserController = {
  insertInToDB,
  getAllDataFromDB,
  getByIdFromDB,
  deleteUser,
  updateUser,
};
