const EventInterface = require("../../core/event-utils/EventInterface");
const GameRepositoryFactory = require("../../factories/GameRepositoryFactory");

class GameInitializedEvent extends EventInterface {
    constructor(playerX, playerO) {
        super()
        this.playerX = playerX
        this.playerO = playerO
    }

    handle = () => {

        // create game repository
        const gameRepo = (new GameRepositoryFactory()).createGameRepository()

        // initialize game in database
        gameRepo.initializeNewGame(this.playerX, this.playerO).then(game => {

            // send message to this users 
            this.socketEmitToUser(this.playerX, game);
            this.socketEmitToUser(this.playerO, game);
        })




    }
}

module.exports = GameInitializedEvent