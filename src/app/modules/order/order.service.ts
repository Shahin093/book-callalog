import { Order, OrderedBook } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertInToDB = async (id: string, payload: any): Promise<Order> => {
  console.log("payload", payload);

  console.log("data_id: : ", id);

  const newOrder = await prisma.order.create({
    data: {
      userId: id,
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
    },
  });

  return result;
};

export const OrderService = {
  insertInToDB,
  getAllFromDB,
};
