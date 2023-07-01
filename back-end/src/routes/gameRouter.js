const GameController = require("../controllers/GameController");
const routeExceptionHandler = require("../helpers/routeExceptionHandler");
const authMiddleware = require("../middlewares/authMiddleware");

const gameRouter = require("express").Router()

const gameController = new GameController()

// check is there is a game starting
gameRouter.get('/check',
    routeExceptionHandler(authMiddleware),
    routeExceptionHandler(gameController.checkGameStarting)
);

module.exports = gameRouter;