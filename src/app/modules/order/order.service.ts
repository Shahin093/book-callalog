import { Order, OrderedBook } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const insertInToDB = async (id: string, payload: any): Promise<Order> => {
  const newOrder = await prisma.order.create({
    data: {
      userId: id,
    },
    include: {
      user: true,
      orderedBooks: true,
    },
  });

  let orderedBookData;
  for (orderedBookData of payload) {
    await prisma.orderedBook.create({
      data: {
        ...orderedBookData,
        orderId: newOrder.id,
      },
    });
  }

  const createdOrder = await prisma.order.findUnique({
    where: {
      id: newOrder.id,
    },
    include: {
      orderedBooks: true,
    },
  });
  if (!createdOrder) {
    throw new Error("Failed to create the order"); // You can customize the error message
  }

  return createdOrder;
};

const getAllFromDB = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    include: {
      orderedBooks: true,
      user: true,
    },
  });

  return result;
};

const getByIdFromDB = async (
  userId: string,
  orderId: string
): Promise<Order | null> => {
  const result = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      user: true,
      orderedBooks: true,
    },
  });

  if (!(result?.userId === userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "it's not your order.");
  }

  return result;
};

export const OrderService = {
  insertInToDB,
  getAllFromDB,
  getByIdFromDB,
};
