const RequestRepository = require("../repositories/RequestRepository");

module.exports = class RequestRepositoryFactory {
    createRequestRepository() {
        return new RequestRepository();
    }
}