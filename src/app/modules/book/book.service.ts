import { Book, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IBookFilterRequest } from "./book.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import {
  bookRelationalFields,
  bookRelationalFieldsMapper,
  bookSearchableFields,
} from "./book.constants";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const insertInToDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};
// const getAllFromDB = async (): Promise<Book[]> => {
//   const result = await prisma.book.findMany();
//   return result;
// };

const getAllFromDB = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { search, minPrice, maxPrice, ...filtersData } = filters;

  const andCondition = [];

  if (search) {
    andCondition.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: search,
          $options: "i",
        },
      })),
    });
  }

  // Parse minPrice and maxPrice as numbers
  const parsedMinPrice = parseFloat(minPrice!);
  const parsedMaxPrice = parseFloat(maxPrice!);

  // Add minPrice and maxPrice conditions if they are valid numbers
  if (!isNaN(parsedMinPrice)) {
    andCondition.push({
      price: {
        gte: parsedMinPrice,
      },
    });
  }

  if (!isNaN(parsedMaxPrice)) {
    andCondition.push({
      price: {
        lte: parsedMaxPrice,
      },
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  if (Object.keys(filtersData)?.length > 0) {
    andCondition.push({
      AND: Object.keys(filtersData).map((key) => {
        if (bookRelationalFields.includes(key)) {
          return {
            [bookRelationalFieldsMapper[key]]: {
              id: (filtersData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filtersData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: any =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            price: "desc",
          },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

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

const updateFromDB = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id,
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
  updateFromDB,
  deleteFromDB,
  getAllFromDB,
};
