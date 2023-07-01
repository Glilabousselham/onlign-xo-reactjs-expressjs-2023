const GameModel = require("../models/GameModel");

module.exports = class GameRepository {

    // initialize the game here
    initializeNewGame = async (playerX, playerO, maxRounds = 5) => {
        let game = await GameModel.create({
            playerX: playerX,
            playerO: playerO,
            currentRound: 1,
            maxRounds: maxRounds,
            ready: {
                x: false,
                o: false,
            },
            rounds: [{
                winner: null,
                positions: {
                    "1": null,
                    "2": null,
                    "3": null,
                    "4": null,
                    "5": null,
                    "6": null,
                    "7": null,
                    "8": null,
                    "9": null,
                }
            }],
            finished: false,
            playerXLeft: false,
            playerOLeft: false,
        });


        game = await GameModel.findById(game._id).populate('playerX playerO')


        return game.getInfo();
    }



    // get if there is a game satrting
    findStaringGameByUserId = async (userid) => {
        const game = await GameModel.findOne({
            $and: [
                {
                    $or: [
                        { playerX: userid },
                        { playerO: userid }
                    ]
                }, {
                    finished: false,
                }
            ]
        }).populate("playerX playerO")

        return game?.getInfo() ?? null;
    }



    findGameByUserId = async (userid) => {

    }


    updateGameById = async () => {

    }

}