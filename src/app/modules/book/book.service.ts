import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertInToDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

// getallBooks

const getByCategoryIdFromDB = async (
  categoryId: string
): Promise<Book[] | null> => {
  const result = await prisma.book.findMany({
    where: {
      categoryId: categoryId,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const getByIdFromDB = async (bookId: string): Promise<Book | null> => {
  const result = await prisma.book.findFirst({
    where: {
      categoryId: bookId,
    },
    include: {
      category: true,
    },
  });
  return result;
};

export const BookService = {
  insertInToDB,
  getByCategoryIdFromDB,
  getByIdFromDB,
};
