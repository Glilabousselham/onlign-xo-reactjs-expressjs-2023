const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: String
})
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
    }
});


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;