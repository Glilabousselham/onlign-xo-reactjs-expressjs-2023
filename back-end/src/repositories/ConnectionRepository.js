const ConnectionModel = require("../models/ConnectionModel");

module.exports = class ConnectionRepository {


    newConnection = async (user, socket) => {
        const connection = await ConnectionModel.findOne({ user: user })
        if (connection) {
            connection.socket = socket;
            await connection.save()
        } else {
            await ConnectionModel.create({ user, socket })
        }
    }
    findByUserId = async (user) => {
        const connection = await ConnectionModel.findOne({ user }).populate('user');
        connection.user.password = null;
        return connection;
    }
    disconnect = async (user) => {
        await ConnectionModel.updateOne({ user }, { $set: { socket: null } })
    }

    getConnectedUsers = async (myid) => {
        const connectedUsers = await ConnectionModel.find({ user: { $ne: myid }, socket: { $ne: null } }).populate("user");

        // console.log(connectedUsers);

        return connectedUsers;
    }
}