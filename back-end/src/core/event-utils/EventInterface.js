const SocketServer = require("../SocketServer");

class EventInterface {

    constructor() {
        this.io = SocketServer.getInstance()
    }

    handle = () => {
        throw new Error("should implement this method (handle)")
    }

    socketEmitToUser = (userId, data) => {
        this.io.emitToSpecificUser(userId, this.constructor.name, data)
    }
}

module.exports = EventInterface