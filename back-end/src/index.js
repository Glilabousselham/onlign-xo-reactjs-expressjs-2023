require("dotenv").config()
const httpServer = require('./core/httpServer')
const appConfig = require('./config/appConfig')
const SocketServer = require("./core/SocketServer")



// start socker
SocketServer.getInstance().listen()

// start web server
httpServer.listen(appConfig.PORT, () => {
    console.log(`server is running on port http://localhost:${appConfig.PORT}`);
})