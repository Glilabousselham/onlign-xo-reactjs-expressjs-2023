const express = require('express')
const authRouter = require('../routes/authRouter')
const mainErrorHandler = require('../error-handlers/handler')
const cors = require("cors")
const http = require('http')
const socket = require('socket.io')
const usersRouter = require('../routes/usersRouter')
const requetsRouter = require('../routes/RequestRouter')

// connect to database
require("../db-connection/connectToDatabase")()


app = express()




// set cors middlewares
app.use(cors())

// set middlewares to parse body data
app.use(express.urlencoded({ extended: false }))
app.use(express.json())




// routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/requests', requetsRouter);



// main error handler
app.use(mainErrorHandler);


// create http sertver
const httpServer = http.createServer(app)




module.exports = httpServer;

