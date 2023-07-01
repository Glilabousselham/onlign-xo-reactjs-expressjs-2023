const event = require("../core/event-utils/event");
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

        const player = game.playerX._id.toString() === userid ? "x" : 'o';

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

        const player = game.playerX._id.toString() === userid ? "x" : 'o';

        game = await this.gameRepo.updateGamePositions(game._id, game.currentRound, position, player);

        // check round status

        const check = this.#checkRound(game.currentRoundInfo.positions);

        if (check !== null) {
            game = await this.gameRepo.setRoundWinner(game._id, game.currentRound, check);
        }

        // dispatch the new game info to users
        event(new GameUpdatedEvent(game))

        return game;
    }

    // private utils
    // function to check for winner 
    /**
     * @returns {"x"|"o"|"draw"|null}
     */
    #checkRound = (positions) => {

        const cases = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            // 
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            // 
            [1, 5, 9],
            [3, 5, 7],
        ]

        // check user
        for (const cas of cases) {
            if (positions[cas[0]] === positions[cas[1]] && positions[cas[0]] === positions[cas[2]] && positions[cas[0]] !== null) {
                return positions[cas[0]];
            }
        }

        // check for draw 
        for (const i of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
            if (positions[i] === null) {
                return null;
            }
        }

        return "draw";
    }



}