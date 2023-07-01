
const RequestRepositoryFactory = require("../factories/RequestRepositoryFactory");
const UserRepositoryFactory = require("../factories/UserRepositoryFactory");
const ConnectionRepositoryFactory = require("../factories/ConnectionRepositoryFactory");
const event = require("../core/event-utils/event");
const RequestSendedEvent = require("../events/request/RequestSendedEvent");
const RequestRefusedEvent = require("../events/request/RequestRefusedEvent");
const RequestAcceptedEvent = require("../events/request/RequestAcceptedEvent");
const RequestCanceledEvent = require("../events/request/RequestCanceledEvent");

module.exports = class RequestsService {

    constructor() {
        this.requestRepo = new RequestRepositoryFactory().createRequestRepository();
        this.connectionRepo = new ConnectionRepositoryFactory().createConnectionRepository();
        this.userRepo = new UserRepositoryFactory().createUserRepository();
    }

    sendRequest = async (sender, receiver) => {

        // check the receiver is not the sender
        if (receiver === sender) {
            throw new Error('you cant send request to youself')
        }

        // check user id connected

        if (!(await this.connectionRepo.findByUserId(receiver))?.socket) {
            throw new Error('the user is not connected')
        }

        // check the request not found
        if (await this.requestRepo.findBySender(sender)) {
            throw new Error("you cant send more then one request in the same time");
        }

        // create the request and return it
        const request = await this.requestRepo.createRequest(sender, receiver);


        // delete the request after 2 minutes if not accepted

        setTimeout(() => {
            this.requestRepo.deleteById(request._id)
        }, 2 * 60 * 1000);
        // send the request to specific user

        this.userRepo.findById(sender).then(senderInfo => {
            request.sender = senderInfo
            event(new RequestSendedEvent(request))
        })

        return request;

    }

    getAll = async (myid) => {
        return (await this.requestRepo.getAll(myid)).map((request) => {

            request.sender = {
                _id: request.sender._id,
                username: request.sender.username,
                image: request.sender.image,
            }

            return request;
        })
    }
    // this is or refused by receiver
    deleteReceived = async (myid, requestid) => {

        const request = await this.requestRepo.deleteReceived(myid, requestid);
        if (request) {
            event(new RequestRefusedEvent(request))
        }
        return request;
    }
    acceptReceived = async (myid, requestid) => {
        const request = await this.requestRepo.deleteReceived(myid, requestid);
        if (!request) throw new Error("the request is not available right now")
        // game initialization
        event(new RequestAcceptedEvent(request))
        return request;
    }
    // the event canceled
    deleteSended = async (myid, requestid) => {
        const request = await this.requestRepo.deleteSended(myid, requestid);
        if (request) event(new RequestCanceledEvent(request))
        return request;
    }

    cehckForRequestExists = async (userid) => {
        const request = await this.requestRepo.findBySender(userid);
        return request ?? null;
    }
}