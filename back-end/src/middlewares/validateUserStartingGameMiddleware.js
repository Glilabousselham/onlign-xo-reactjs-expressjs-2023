const CustomException = require("../exceptions/CustomException");
const GameRepositoryFactory = require("../factories/GameRepositoryFactory")

module.exports = async function validateUserStartingGameMiddleware(req, res, next) {
    const gameRepo = new GameRepositoryFactory().createGameRepository()

    const game = await gameRepo.findStaringGameByUserId(req.user._id);

    if (!game) throw new CustomException("you are not starting a game ")

    req.game = game;

    return next();

}