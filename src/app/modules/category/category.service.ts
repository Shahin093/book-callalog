import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertInToDB = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });

  return result;
};

const getAllDataFromDB = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();

  return result;
};

const getByIdFromDB = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findFirst({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });

  return result;
};
const updateFromDB = async (
  id: string,
  payload: Partial<Category>
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
    include: {
      books: true,
    },
  });

  return result;
};

const deleteFromDB = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });

  return result;
};

export const CategoryService = {
  insertInToDB,
  getAllDataFromDB,
  getByIdFromDB,
  updateFromDB,
  deleteFromDB,
};
