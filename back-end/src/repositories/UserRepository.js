const UserModel = require("../models/UserModel");

module.exports = class UserRepository {


    createUser = async (username, password) => {
        return await UserModel.create({ username, password })
    }

    findByUsername = async (username) => {
        return await UserModel.findOne({ username });
    }
    findById = async (id) => {
        return await UserModel.findOne({ _id: id });
    }

}