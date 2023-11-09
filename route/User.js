const routes = require("express").Router();
const UserController = require("../controller/User");
const AuthController = require("../controller/Auth");

routes
    .post("/signup", UserController.signup)
    .post("/login", AuthController.login)

exports.routes = routes
