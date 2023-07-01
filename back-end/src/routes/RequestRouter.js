const authMiddleware = require("../middlewares/authMiddleware");
const RequestController = require("../controllers/RequestController");
const routeExceptionHandlerMultiple = require("../helpers/routeExceptionHandlerMultiple");
const validateUserNotStartingGameMiddleware = require("../middlewares/validateUserNotStartingGameMiddleware");
const requetsRouter = require("express").Router()

const requestController = new RequestController()

// send request
requetsRouter.post(
    "/:receiver",
    routeExceptionHandlerMultiple(authMiddleware, validateUserNotStartingGameMiddleware, requestController.sendRequest)
)
// get all requests
requetsRouter.get(
    "/",
    routeExceptionHandlerMultiple(authMiddleware, requestController.get)
)
// delete a received requests
requetsRouter.delete(
    "/received/:id",
    routeExceptionHandlerMultiple(authMiddleware, validateUserNotStartingGameMiddleware, requestController.deleteReceived)
)
// accept a received requests
requetsRouter.post(
    "/received/:id",
    routeExceptionHandlerMultiple(authMiddleware, validateUserNotStartingGameMiddleware, requestController.acceptRequest)
)
// delete a sended requests
requetsRouter.delete(
    "/sended/:id",
    routeExceptionHandlerMultiple(authMiddleware, validateUserNotStartingGameMiddleware, requestController.deleteSended)
)
// check a sended request exists
requetsRouter.get(
    "/check/",
    routeExceptionHandlerMultiple(authMiddleware, requestController.cehckForRequestExists)
)
module.exports = requetsRouter;