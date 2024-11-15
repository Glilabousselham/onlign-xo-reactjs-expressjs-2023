const UsersService = require("../services/UsersService")

module.exports = class AuthController {
    getConnectedUsers = async (req, res) => {
        // console.log(req.user);
        return res.json(await (new UsersService()).getConnectedUsers(req.user?._id))
    }
}