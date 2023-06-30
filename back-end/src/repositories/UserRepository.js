const UserModel = require("../models/UserModel");
const UserRepositoryInterface = require("../repository-interfaces/UserRepositoryInterface");

module.exports = class UserRepository extends UserRepositoryInterface {


    createUser = async (username, password) => {
        return await UserModel.create({ username, password })
    }

    findByUsername = async (username) => {
        return await UserModel.findOne({ username });
    }

}