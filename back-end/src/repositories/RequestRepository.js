const RequestModel = require("../models/RequestModel");

module.exports = class RequestRepository {


    createRequest = async (sender, receiver) => {
        const request = await RequestModel.create({ sender, receiver });
        return request;
    }

    findBySender = async (sender) => {
        return await RequestModel.findOne({ sender })
    }
    findById = async (_id) => {
        return await RequestModel.findOne({ _id })
    }

    getAll = async (myid) => {
        return await RequestModel.find({ receiver: myid }).populate("sender")
    }

    deleteReceived = async (myid, requestid) => {
        return await RequestModel.findOneAndDelete({ _id: requestid, receiver: myid })
    }

    deleteSended = async (myid, requestid) => {
        return await RequestModel.findOneAndDelete({ _id: requestid, sender: myid })
    }
    deleteById = async (_id) => {
        return await RequestModel.findOneAndDelete({ _id })
    }

}