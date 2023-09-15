import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertInToDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
  });
  return result;
};

export const BookService = {
  insertInToDB,
};
