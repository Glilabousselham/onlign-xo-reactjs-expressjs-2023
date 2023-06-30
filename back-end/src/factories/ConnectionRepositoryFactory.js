const ConnectionRepository = require("../repositories/ConnectionRepository");

module.exports = class ConnectionRepositoryFactory {
    createConnectionRepository() {
        return new ConnectionRepository();
    }
}