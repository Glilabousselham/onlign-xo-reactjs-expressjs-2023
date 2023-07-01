const AuthService = require("../services/AuthService")

module.exports = class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    login = async (req, res, next) => {

        return res.status(200).json(await this.authService.login(req.body));

    }
    logout = async (req, res, next) => {

    }

    user = async (req, res, next) => {

        return res.json(req.user);
    }
}