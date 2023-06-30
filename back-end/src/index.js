require("dotenv").config()
const app = require('./core/app')
const appConfig = require('./config/appConfig')

app.listen(appConfig.PORT, () => {
    console.log(`server is running on port http://localhost:${appConfig.PORT}`);
})