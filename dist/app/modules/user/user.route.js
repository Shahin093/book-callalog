"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controlle_1 = require("./user.controlle");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controlle_1.UserController.getAllDataFromDB);
router.get("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controlle_1.UserController.getByIdFromDB);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controlle_1.UserController.deleteUser);
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controlle_1.UserController.updateUser);
router.get("/profile", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), user_controlle_1.UserController.GetMyProfile);
exports.UserRoutes = router;
