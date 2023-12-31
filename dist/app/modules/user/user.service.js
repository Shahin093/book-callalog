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
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const insertInToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistEmail = yield prisma_1.default.user.findUnique({
        where: {
            email: data === null || data === void 0 ? void 0 : data.email,
        },
    });
    if (isExistEmail) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User Already Regis.");
    }
    const result = yield prisma_1.default.user.create({
        data,
    });
    return result;
});
const getAllDataFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany();
    return result;
});
const getByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.delete({
        where: {
            id,
        },
    });
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const GetMyProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findFirst({
        where: {
            id: userId,
        },
    });
    return result;
});
exports.UserService = {
    insertInToDB,
    getAllDataFromDB,
    getByIdFromDB,
    deleteUser,
    updateUser,
    GetMyProfile,
};
