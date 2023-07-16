const UnauthorizedException = require("../exceptions/UnauthorizedException");
const UserRepositoryFactory = require("../factories/UserRepositoryFactory");
const JWT = require("../wrappers/JWT")

module.exports = async function authMiddleware(req, res, next) {
    try {
        const token = req.headers?.authorization?.split(" ")[1]

        const result = JWT.verify(token);

        delete result.iat

        if (!result) {
            throw new UnauthorizedException()
        }

        // check the user existed in database 
        const user = await (new UserRepositoryFactory).createUserRepository().findById(result._id);

        if (!user) {
            throw new UnauthorizedException()
        }

        req.user = user;

        return next()

    } catch (error) {
        throw new UnauthorizedException()
    }
}