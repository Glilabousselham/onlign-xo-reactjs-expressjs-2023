const GameRepository = require("../repositories/GameRepository")

module.exports = class GameRepositoryFactory {
    createGameRepository() {
        return new GameRepository();
    }
}