const EventInterface = require("../../core/event-utils/EventInterface");
const event = require("../../core/event-utils/event");
const GameInitializedEvent = require("../game/GameInitializedEvent");

class RequestAcceptedEvent extends EventInterface {

    constructor(request) {
        super()
        this.request = request
    }

    handle = () => {
        event(new GameInitializedEvent(this.request.sender, this.request.receiver))
    }
}


module.exports = RequestAcceptedEvent;