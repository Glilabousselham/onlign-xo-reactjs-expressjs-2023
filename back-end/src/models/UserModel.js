const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    image: String
})


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;