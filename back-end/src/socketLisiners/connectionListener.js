const ConnectionRepositoryFactory = require("../factories/ConnectionRepositoryFactory");
const JWT = require("../wrappers/JWT");

module.exports = function connectionListener(socket) {
    const connectionRepo = (new ConnectionRepositoryFactory).createConnectionRepository()

    try {
        const token = socket.handshake.query?.token?.split(" ")[1];

        const user = JWT.verify(token)

        console.log("connected : " + user._id);

        connectionRepo.newConnection(user._id, socket.id);

        socket.broadcast.emit('new-user-connection', user)

        socket.on('disconnect', () => {
            console.log("disconnected : " + user._id);
            socket.broadcast.emit('new-user-disconnected', user)
            connectionRepo.disconnect(user._id);
        });
    } catch (error) {
        console.log(error);
        socket.disconnect()
    }
}