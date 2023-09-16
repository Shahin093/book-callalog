"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const book_constants_1 = require("./book.constants");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const insertInToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { search, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["search", "minPrice", "maxPrice"]);
    const andCondition = [];
    if (search) {
        andCondition.push({
            $or: book_constants_1.bookSearchableFields.map((field) => ({
                [field]: {
                    $regex: search,
                    $options: "i",
                },
            })),
        });
    }
    // Parse minPrice and maxPrice as numbers
    const parsedMinPrice = parseFloat(minPrice);
    const parsedMaxPrice = parseFloat(maxPrice);
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
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    if (((_a = Object.keys(filtersData)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        andCondition.push({
            AND: Object.keys(filtersData).map((key) => {
                if (book_constants_1.bookRelationalFields.includes(key)) {
                    return {
                        [book_constants_1.bookRelationalFieldsMapper[key]]: {
                            id: filtersData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filtersData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = yield prisma_1.default.book.findMany({
        include: {
            category: true,
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                price: "desc",
            },
    });
    const total = yield prisma_1.default.book.count({
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
});
const getByCategoryIdFromDB = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId: categoryId,
        },
        include: {
            category: true,
        },
    });
    return result;
});
const getByIdFromDB = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findFirst({
        where: {
            categoryId: bookId,
        },
        include: {
            category: true,
        },
    });
    return result;
});
const updateFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
        include: {
            category: true,
        },
    });
    return result;
});
const deleteFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
exports.BookService = {
    insertInToDB,
    getByCategoryIdFromDB,
    getByIdFromDB,
    updateFromDB,
    deleteFromDB,
    getAllFromDB,
};
