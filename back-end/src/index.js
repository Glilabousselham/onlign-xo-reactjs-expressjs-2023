require("dotenv").config()
const appConfig = require('./config/appConfig')
const httpServer = require('./core/httpServer')


require("./core/SocketServer").getInstance().connect(httpServer)
// start web server
httpServer.listen(appConfig.PORT, () => {
    console.log(`server is running on port http://localhost:${appConfig.PORT}`);
    // link socket io
})