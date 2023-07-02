const ConnectionRepositoryFactory = require("../factories/ConnectionRepositoryFactory");
const JWT = require("../wrappers/JWT");

module.exports = function connectionListener(socket) {
    const connectionRepo = (new ConnectionRepositoryFactory).createConnectionRepository()

    try {
        const token = socket.handshake.query?.token?.split(" ")[1];

        const user = JWT.verify(token)

        connectionRepo.newConnection(user._id, socket.id);

        socket.broadcast.emit('new-user-connection', user)

        socket.on('disconnect', () => {
            connectionRepo.disconnect(user._id);
            socket.broadcast.emit('new-user-disconnected', user)
        });
    } catch (error) {
        console.log(error);
        socket.disconnect()
    }
}