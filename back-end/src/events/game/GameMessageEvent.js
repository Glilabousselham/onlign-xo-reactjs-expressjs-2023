const EventInterface = require("../../core/event-utils/EventInterface");

class GameMessageEvent extends EventInterface {
    constructor(userid, message) {
        super()
        this.userid = userid
        this.message = message
    }

    handle = () => {

        // create game repository
        // const gameRepo = (new GameRepositoryFactory()).createGameRepository()


        // send message to this users
        this.socketEmitToUser(this.userid, this.message);

    }
}

module.exports = GameMessageEvent



