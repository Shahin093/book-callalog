"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const user_controlle_1 = require("../user/user.controlle");
const router = express_1.default.Router();
router.post("/signin", auth_controller_1.AuthController.loginUser);
router.post("/signup", user_controlle_1.UserController.insertInToDB);
exports.AuthRoutes = router;
