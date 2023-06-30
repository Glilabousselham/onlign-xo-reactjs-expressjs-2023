module.exports = class ValidationException extends Error {
    #mErrors = {};


    mWithJoiErrors = (errors) => {
        // this.#mErrors = errors;
        for (let error of errors.details) {
            this.#mErrors[error.context.key] = error.message;
        }
        return this;
    }

    mSetErrors = (errors) => {
        this.#mErrors = errors;
        return this;
    }

    mGetErrors = () => this.#mErrors;
}