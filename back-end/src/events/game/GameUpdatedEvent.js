const EventInterface = require("../../core/event-utils/EventInterface");
const GameRepositoryFactory = require("../../factories/GameRepositoryFactory");

class GameUpdatedEvent extends EventInterface {
    constructor(game) {
        super()
        this.game = game
    }

    handle = () => {

        // create game repository
        // const gameRepo = (new GameRepositoryFactory()).createGameRepository()


        // send message to this users
        this.socketEmitToUser(this.game.playerX._id, this.game);
        this.socketEmitToUser(this.game.playerO._id, this.game);

    }
}

module.exports = GameUpdatedEvent



