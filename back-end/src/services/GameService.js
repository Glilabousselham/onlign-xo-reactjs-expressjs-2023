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



}