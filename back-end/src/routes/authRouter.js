const AuthController = require("../controllers/AuthController");
const routeExceptionHandler = require("../helpers/routeExceptionHandler");
const authMiddleware = require("../middlewares/authMiddleware");

const authRouter = require("express").Router()

const authController = new AuthController()

authRouter.post('/login', routeExceptionHandler(authController.login));
// authRouter.post('/logout', routeExceptionHandler(authController.logout)); // just forget the token from browser
authRouter.get('/user', routeExceptionHandler(authMiddleware), routeExceptionHandler(authController.user));

module.exports = authRouter;