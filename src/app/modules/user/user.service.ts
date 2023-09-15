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

export const UserService = {
  insertInToDB,
};
