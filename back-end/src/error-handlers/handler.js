// this is the main error handler

const CustomException = require("../exceptions/CustomException");
const UnauthorizedException = require("../exceptions/UnauthorizedException");
const ValidationException = require("../exceptions/ValidationException");

module.exports = function hanler(err, req, res, next) {

    let status = 500;
    let data = {

    };
    if (err instanceof ValidationException) {
        data.message = "bad request";

        data.errors = err.mGetErrors()

        status = 400
    }
    if (err instanceof UnauthorizedException) {
        data.message = "unauthorized";
        status = 401
    } else if (err instanceof CustomException) {
        data.message = err.message;

    } else if (err instanceof Error) {
        data.message = err.message; // i will update this when finishing coding to make it return unundertanding error message 
    }

    res.status(status).json(data)

    console.log(err);
}