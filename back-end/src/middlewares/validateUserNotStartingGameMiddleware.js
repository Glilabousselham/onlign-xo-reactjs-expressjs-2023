const CustomException = require("../exceptions/CustomException");
const GameRepositoryFactory = require("../factories/GameRepositoryFactory")

module.exports = async function validateUserNotStartingGameMiddleware(req, res, next) {
    const gameRepo = new GameRepositoryFactory().createGameRepository()

    const game = await gameRepo.findStaringGameByUserId(req.user._id);

    if (game) throw new CustomException("you are string a game, so you can do nothing until the game finished")

    return next();

}