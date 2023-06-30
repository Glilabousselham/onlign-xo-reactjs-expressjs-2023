
const RequestsService = require("../services/RequestsService")

module.exports = class RequestController {


    constructor() {
        this.requestService = new RequestsService()
    }

    sendRequest = async (req, res) => {
        return res.json(await this.requestService.sendRequest(req.user._id, req.params.receiver))
    }

    get = async (req, res) => {
        return res.json(await this.requestService.getAll(req.user._id))
    }

    deleteReceived = async (req, res) => {

        return res.status(200).json(await this.requestService.deleteReceived(req.user._id, req.params.id))
    }
    acceptRequest = async (req, res) => {
        return res.json(await this.requestService.acceptReceived(req.user._id, req.params.id));
    }

    deleteSended = async (req, res) => {

        return res.status(200).json(await this.requestService.deleteSended(req.user._id, req.params.id))
    }
    cehckForRequestExists = async (req, res) => {
        return res.json(await this.requestService.cehckForRequestExists(req.user._id));
    }
}