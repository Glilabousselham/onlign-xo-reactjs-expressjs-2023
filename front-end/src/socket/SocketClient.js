import { io } from "socket.io-client";

class SocketClient {
    static #instance = null;

    #socket = null;


    connect = () => {
        this.#socket = io(process.env.REACT_APP_API_URL,
            {
                withCredentials: true,
                query: {
                    token: window.localStorage.getItem('token')
                }
            });
    }


    /** @return {SocketClient} */
    static getInstance = () => {
        if (this.#instance === null) {
            this.#instance = new this()
        }

        return this.#instance;
    }

    isConnected = () => {
        return this.#socket !== null;
    }

    on = (event, callback) => {
        this.#socket.on(event, callback);
    }

    emit = (event, data) => {
        this.#socket.emit(event, data);
    }
}


export default SocketClient