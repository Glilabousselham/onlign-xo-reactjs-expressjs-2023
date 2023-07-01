const event = require("../core/event-utils/event");
const GameUpdatedEvent = require("../events/game/GameUpdatedEvent");
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


        const player = game.playerX._id.toString() === userid ? "x" : 'o';

        const newGameData = await this.gameRepo.setUserReady(game._id, player);

        // dispatch the new game info to users
        event(new GameUpdatedEvent(newGameData))

        return newGameData;
    }



}