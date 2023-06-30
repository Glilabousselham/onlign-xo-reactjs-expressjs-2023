const UnauthorizedException = require("../exceptions/UnauthorizedException");
const JWT = require("../wrappers/JWT")

module.exports = async function authMiddleware(req, res, next) {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const result = JWT.verify(token);
        delete result.iat
        if (!result) {
            throw new UnauthorizedException()
        }
        req.user = result;
        next()
    } catch (error) {
        throw new UnauthorizedException()
    }
}