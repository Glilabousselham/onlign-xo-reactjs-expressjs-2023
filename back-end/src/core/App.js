const express = require('express')
const authRouter = require('../routes/authRouter')
const mainErrorHandler = require('../error-handlers/handler')
const cors = require("cors")


// connect to database
require("../db-connection/connectToDatabase")()


app = express()

// set cors middlewares
app.use(cors())

// set middlewares to parse body data
app.use(express.urlencoded({ extended: false }))
app.use(express.json())




// routes
app.use('/auth', (req, res, next) => {


    setTimeout(() => {
        next()
    }, 2000);

}, authRouter);



// main error handler
app.use(mainErrorHandler);


module.exports = app;