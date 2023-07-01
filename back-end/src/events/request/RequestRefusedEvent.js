const EventInterface = require("../../core/event-utils/EventInterface");

class RequestRefusedEvent extends EventInterface {


    constructor(request) {
        super()
        this.request = request
    }

    handle = () => {
        this.io.emitToSpecificUser(this.request.sender, this.constructor.name, this.request)
    }
}


module.exports = RequestRefusedEvent;