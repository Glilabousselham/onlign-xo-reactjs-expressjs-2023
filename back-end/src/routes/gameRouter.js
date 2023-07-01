const GameController = require("../controllers/GameController");
const routeExceptionHandlerMultiple = require("../helpers/routeExceptionHandlerMultiple");
const authMiddleware = require("../middlewares/authMiddleware");
const validateUserStartingGameMiddleware = require("../middlewares/validateUserStartingGameMiddleware");

const gameRouter = require("express").Router()

const gameController = new GameController()

// check is there is a game starting
gameRouter.get('/check',
    routeExceptionHandlerMultiple(
        authMiddleware,
        gameController.checkGameStarting
    )
);
gameRouter.put('/ready',
    routeExceptionHandlerMultiple(
        authMiddleware,
        validateUserStartingGameMiddleware,
        gameController.setUserReady
    )
);

module.exports = gameRouter;