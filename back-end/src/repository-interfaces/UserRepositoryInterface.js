
module.exports = class UserRepositoryInterface {
    createUser = async (username, password) => {
        throw new Error("the function createUser() must be implemented")
    }
    findByUsername = async (username) => {
        throw new Error("implement method");
    }
}