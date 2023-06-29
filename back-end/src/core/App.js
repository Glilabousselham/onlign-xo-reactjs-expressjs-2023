const appConfig = require("../config/appConfig");
const express = require('express')

class App {

    #port;
    #server;


    constructor() {
        this.#port = appConfig.PORT
        this.#server = express()
    }


    run = () => {
        this.#server.listen(this.#port, () => {
            console.log(`server is running on port http://localhost:${this.#port}`);
        })
    }


}

module.exports = App;