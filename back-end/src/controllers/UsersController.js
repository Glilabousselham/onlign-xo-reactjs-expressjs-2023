const ConnectionRepository = require("../repositories/ConnectionRepository")
const UsersService = require("../services/UsersService")

module.exports = class AuthController {
    getConnectedUsers = async (req, res) => {
        return res.json(await (new UsersService()).getConnectedUsers(req.user._id))
    }
}