const EventInterface = require("../../core/event-utils/EventInterface");

class RequestSendedEvent extends EventInterface {


    constructor(request) {
        super()
        this.request = request
    }

    handle = () => {
        this.io.emitToSpecificUser(this.request.receiver, this.constructor.name, this.request)
    }
}


module.exports = RequestSendedEvent;