const appConfig = require("../config/appConfig");
const httpServer = require("./httpServer");
const socketLibrary = require("socket.io")



module.exports = class SocketServer {


    #io = null
    constructor() {
        this.#io = new socketLibrary.Server(httpServer, {
            cors: {
                origin: appConfig.allowedOrigins,
                credentials: true
            }
        })
    }

    static #instance = null
    /** @returns {SocketServer} */
    static getInstance = () => {
        if (this.#instance === null) {
            this.#instance = new this;
        }

        return this.#instance;
    }


    listen = () => {


        // listen for connection
        this.#io.on("connection", (socket) => {

            const token = socket.handshake.query.token;

            console.log("user token: " + token);

            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
            });

        })



    }

}


