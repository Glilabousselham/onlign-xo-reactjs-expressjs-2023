const bcrypt = require('bcrypt')
module.exports = class Hash {

    static make = (text) => {
        return bcrypt.hashSync(text, bcrypt.genSaltSync(10))
    }

    static compare = (normalText, hashedText) => {
        return bcrypt.compareSync(normalText, hashedText)
    }
}