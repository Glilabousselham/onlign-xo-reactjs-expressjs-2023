const EventInterface = require("../../core/event-utils/EventInterface");

class GameInitializedEvent extends EventInterface {
    constructor(playerX, playerO) {
        super()
        this.playerX = playerX
        this.playerO = playerO
    }

    handle = () => {
        console.log("game initialized ", {
            playerX: this.playerX,
            playerO: this.playerO,
        });

        this.socketEmitToUser(this.playerX, 'game initialized');
        this.socketEmitToUser(this.playerO, 'game initialized');


    }
}

module.exports = GameInitializedEvent