const routeExceptionHandler = require("../helpers/routeExceptionHandler");
const UsersController = require("../controllers/UsersController");
const authMiddleware = require("../middlewares/authMiddleware");
const usersRouter = require("express").Router()

const usersController = new UsersController()

usersRouter.get(
    "/connected",
    routeExceptionHandler(authMiddleware),
    routeExceptionHandler(usersController.getConnectedUsers)
)

module.exports = usersRouter;