
const mongoose = require("mongoose")
const connectToDatabase = async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("database connected");
}


module.exports = connectToDatabase