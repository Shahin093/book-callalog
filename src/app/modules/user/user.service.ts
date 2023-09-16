import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const insertInToDB = async (data: User): Promise<User> => {
  const isExistEmail = await prisma.user.findUnique({
    where: {
      email: data?.email,
    },
  });

  if (isExistEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User Already Regis.");
  }

  const result = await prisma.user.create({
    data,
  });
  return result;
};

const getAllDataFromDB = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();

  return result;
};

const getByIdFromDB = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const GetMyProfile = async (userId: string): Promise<User | null> => {
  const result = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  return result;
};

export const UserService = {
  insertInToDB,
  getAllDataFromDB,
  getByIdFromDB,
  deleteUser,
  updateUser,
  GetMyProfile,
};
