
const ConnectionRepositoryFactory = require("../factories/ConnectionRepositoryFactory");

module.exports = class UsersService {

    constructor() {
        this.connectionRepository = new ConnectionRepositoryFactory().createConnectionRepository();
    }

    getConnectedUsers = async (myid) => {
        return (await this.connectionRepository.getConnectedUsers(myid))
            .filter(c => c.user)
            .map((c => {

                return {
                    _id: c.user?._id,
                    username: c.user?.username,
                    image: c.user?.image,
                }
            }));
    }

}