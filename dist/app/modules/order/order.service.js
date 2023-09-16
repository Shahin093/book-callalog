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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const insertInToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = yield prisma_1.default.order.create({
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
        yield prisma_1.default.orderedBook.create({
            data: Object.assign(Object.assign({}, orderedBookData), { orderId: newOrder.id }),
        });
    }
    const createdOrder = yield prisma_1.default.order.findUnique({
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
});
const getAllFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({
        include: {
            orderedBooks: true,
            user: true,
        },
    });
    return result;
});
const getByIdFromDB = (userId, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findFirst({
        where: {
            id: orderId,
        },
        include: {
            user: true,
            orderedBooks: true,
        },
    });
    if (!((result === null || result === void 0 ? void 0 : result.userId) === userId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "it's not your order.");
    }
    return result;
});
exports.OrderService = {
    insertInToDB,
    getAllFromDB,
    getByIdFromDB,
};
