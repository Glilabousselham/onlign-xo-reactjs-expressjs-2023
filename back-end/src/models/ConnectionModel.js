const mongoose = require("mongoose")

const ConnectionModel = mongoose.model("Connection", mongoose.Schema({
    socket: { type: String, required: false, default: null },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
}))

module.exports = ConnectionModel;