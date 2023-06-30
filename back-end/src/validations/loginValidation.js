const Joi = require('joi')

loginValidation = Joi.object({
    username: Joi.string().required().min(3).max(20),
    password: Joi.string().required().min(4).max(12)
})

module.exports = loginValidation