
const GameService = require("../services/GameService")

module.exports = class GameController {
    constructor() {
        this.gameService = new GameService();
    }
    // check the logged user if he statring a game or not 
    checkGameStarting = async (req, res) => {
        const userid = req.user._id

        return res.json(await this.gameService.checkGameStarting(userid))
    }

    setUserReady = async (req, res) => {
        return res.json(await this.gameService.setUserReady(req.game, req.user._id));
    }
    userPlay = async (req, res) => {
        return res.json(await this.gameService.userPlay(req.game, req.user._id, +req.body.position));
    }

    userLeave = async (req, res) => {
        return res.json(await this.gameService.userLeave(req.game, req.user._id))
    }

}