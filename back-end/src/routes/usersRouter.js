const routeExceptionHandlerMultiple = require("../helpers/routeExceptionHandlerMultiple");
const UsersController = require("../controllers/UsersController");
const authMiddleware = require("../middlewares/authMiddleware");
const usersRouter = require("express").Router()

const usersController = new UsersController()

usersRouter.get(
    "/connected",
    routeExceptionHandlerMultiple(authMiddleware, usersController.getConnectedUsers)
)

module.exports = usersRouter;