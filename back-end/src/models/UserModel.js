const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    image: String
})
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
    }
});


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;