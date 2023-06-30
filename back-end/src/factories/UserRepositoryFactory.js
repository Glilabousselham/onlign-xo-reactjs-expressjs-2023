const UserRepository = require("../repositories/UserRepository")

module.exports = class UserRepositoryFactory {
    createUserRepository() {
        return new UserRepository();
    }
}