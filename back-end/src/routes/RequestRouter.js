const routeExceptionHandler = require("../helpers/routeExceptionHandler");
const authMiddleware = require("../middlewares/authMiddleware");
const RequestController = require("../controllers/RequestController");
const requetsRouter = require("express").Router()

const requestController = new RequestController()

// send request
requetsRouter.post(
    "/:receiver",
    routeExceptionHandler(authMiddleware),
    routeExceptionHandler(requestController.sendRequest)
)
// get all requests
requetsRouter.get(
    "/",
    routeExceptionHandler(authMiddleware),
    routeExceptionHandler(requestController.get)
)
// delete a received requests
requetsRouter.delete(
    "/received/:id",
    routeExceptionHandler(authMiddleware),
    routeExceptionHandler(requestController.deleteReceived)
)
// accept a received requests
requetsRouter.post(
    "/received/:id",
    routeExceptionHandler(authMiddleware),
    routeExceptionHandler(requestController.acceptRequest)
)
// delete a sended requests
requetsRouter.delete(
    "/sended/:id",
    routeExceptionHandler(authMiddleware),
    routeExceptionHandler(requestController.deleteSended)
)
// check a sended request exists
requetsRouter.get(
    "/check/",
    routeExceptionHandler(authMiddleware),
    routeExceptionHandler(requestController.cehckForRequestExists)
)
module.exports = requetsRouter;