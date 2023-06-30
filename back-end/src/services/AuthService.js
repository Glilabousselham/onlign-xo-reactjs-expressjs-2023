const ValidationException = require("../exceptions/ValidationException");
const UserRepositoryFactory = require("../factories/UserRepositoryFactory")
const loginValidation = require('../validations/loginValidation');
const Hash = require("../wrappers/Hash");
const JWT = require("../wrappers/JWT");
module.exports = class AuthService {

    constructor() {
        this.userRepository = new UserRepositoryFactory().createUserRepository();
    }

    login = async (data) => {

        const { error, value } = loginValidation.validate(data, { abortEarly: false })


        if (error) {
            throw new ValidationException().mWithJoiErrors(error)
        }


        let user = await this.userRepository.findByUsername(value.username);

        if (user !== null && !Hash.compare(value.password, user.password)) {
            throw new ValidationException().mSetErrors({ password: "the password is wrong" })
        } else {
            // create new user
            user = await this.userRepository.createUser(value.username, Hash.make(value.password));
        }

        // log the user and  generate token

        const userData = {
            _id: user._id,
            username: user.username,
            image: user.image,
        }

        delete userData.password
        delete userData.__v

        const token = JWT.sign(userData)


        return {
            token_type: "Bearer",
            token,
            user: userData,
        }
    }

}