const appConfig = require("../config/appConfig");
const socketLibrary = require("socket.io")
const connectionListener = require("../socketLisiners/connectionListener");
const ConnectionRepositoryFactory = require("../factories/ConnectionRepositoryFactory");
class SocketServer {
    #connectionRepository;
    #io = null
    constructor() {
        this.#connectionRepository = (new ConnectionRepositoryFactory).createConnectionRepository()
    }

    static #instance = null
    /** @returns {SocketServer} */
    static getInstance = () => {
        if (this.#instance === null) {
            this.#instance = new this();
        }

        return this.#instance;
    }


    listen = () => {
        // listen for new connection
        this.#io.on("connection", connectionListener)



    }

    connect = (httpServer) => {
        this.#io = new socketLibrary.Server(httpServer, {
            cors: {
                origin: appConfig.allowedOrigins,
                credentials: false
            }
        })
        this.listen()
    }

    emitToSpecificUser = async (userId, event, data) => {
        const connection = await this.#connectionRepository.findByUserId(userId)
        if (!connection) {
            return;
        }
        this.#io.to(connection.socket).emit(event, data);
    }

}


module.exports = SocketServer;
