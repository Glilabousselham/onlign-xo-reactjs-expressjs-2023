const jwt = require('jsonwebtoken')
module.exports = class JWT {

    static sign = (payload) => {
        return jwt.sign(payload, process.env.KEY)
    }

    static verify = (token) => {
        return jwt.verify(token, process.env.KEY)
    }
}