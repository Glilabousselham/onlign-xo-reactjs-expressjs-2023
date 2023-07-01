const EventInterface = require('./EventInterface');

/**
 * 
 * @param {EventInterface} eventObject 
 */
const event = async function (eventObject) {
    eventObject.handle()
}

module.exports = event
