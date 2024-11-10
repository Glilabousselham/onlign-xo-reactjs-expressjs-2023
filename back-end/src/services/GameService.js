const event = require("../core/event-utils/event");
const GameMessageEvent = require("../events/game/GameMessageEvent");
const GameUpdatedEvent = require("../events/game/GameUpdatedEvent");
const CustomException = require("../exceptions/CustomException");
const GameRepositoryFactory = require("../factories/GameRepositoryFactory")

module.exports = class GameService {

    constructor() {
        this.gameRepo = new GameRepositoryFactory().createGameRepository();
    }

    checkGameStarting = async (userid) => {
        const game = await this.gameRepo.findStaringGameByUserId(userid);

        if (!game) throw new Error("there is no game starting by this user ");

        return game;
    }

    setUserReady = async (game, userid) => {

        const player = game.playerX._id.toString() === userid.toString() ? "x" : 'o';

        const newGameData = await this.gameRepo.setUserReady(game._id, player);

        // dispatch the new game info to users
        event(new GameUpdatedEvent(newGameData))

        return newGameData;
    }
    userPlay = async (game, userid, position) => {

        if (position > 9 || position < 1) throw new CustomException("invalid position")

        if (game.currentRoundInfo.winner !== null) throw new CustomException("round end please wait")

        if (!game.playerX.ready || !game.playerO.ready) throw new CustomException("the game is not stater yet")

        if (game.currentRoundInfo.positions[position] !== null) throw new CustomException("the position that you play in is not empty")

        const player = game.playerX._id.toString() === userid.toString() ? "x" : 'o';

        game = await this.gameRepo.updateGamePositions(game._id, game.currentRound, position, player);


        // check if the game finished
        const check = this.#checkGameFinished(game)

        if (check) {
            console.log("game finished");
            game = await this.gameRepo.setGameFinished(game._id);
        }

        // dispatch the new game info to users
        event(new GameUpdatedEvent(game))

        return game;
    }
    userLeave = async (game, userid) => {
        const data = {};
        if (game.playerX._id.toString() === userid.toString()) {
            data.playerXLeft = true;
        } else {
            data.playerOLeft = true;
        }

        game = await this.gameRepo.setPlayerLeft(game._id, data)

        event(new GameUpdatedEvent(game))

        return game;
    }

    message = async (game, userid, message) => {

        if (typeof message !== "string") {
            return {};
        }

        if (message.length >= 75) {
            message = message.substring(0, 74);
        }

        const targetUser = game.playerX._id.toString() === userid.toString() ? game.playerO._id : game.playerX._id;

        event(new GameMessageEvent(targetUser, message.trim()))

        return {};
    }

    #checkGameFinished = (gameInfo) => {
        const allRoundsIsFinished = Object.values(gameInfo.rounds).filter(round => round.winner === null).length === 0;
        return allRoundsIsFinished;
    }



}