import express from "express";
import { LoginRequest, RegisterRequest } from "./models.js";
import AuthController from "./controller.js";
import { register } from "node:module";

const AuthControllerInstance = new AuthController();

export const authRouter = express.Router();
authRouter.post("/register", AuthControllerInstance.handleRegister.bind(AuthControllerInstance));
authRouter.post("/login", AuthControllerInstance.handleLogin.bind(AuthControllerInstance));
