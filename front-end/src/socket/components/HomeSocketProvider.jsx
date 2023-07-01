import React, { useEffect } from 'react'
import useSocket from '../../hooks/useSocket'
import { useDispatch } from "react-redux"
import { newUserConnected, newUserDisconnected } from '../../redux/users/usersSlice'
import { newRequestDeleted, newRequestReceived, sendedRequestDeleted } from '../../redux/requests/requestsSlice'
import { useNavigate } from "react-router-dom"

const HomeSocketProvider = ({ children }) => {

    const socket = useSocket()

    const navigate = useNavigate()


    const d = useDispatch()
    useEffect(() => {
        // this mean the request is sended to me, which mean the request received to me 
        socket.on('RequestSendedEvent', function (data) {
            d(newRequestReceived(data))
        })
        socket.on('RequestCanceledEvent', function (data) {
            d(newRequestDeleted(data))
        })
        socket.on('new-user-connection', function (user) {
            d(newUserConnected(user))
        })
        socket.on('new-user-disconnected', function (user) {
            d(newUserDisconnected(user))
        })

        // listen for game initialize on accept a request
        socket.on("GameInitializedEvent", function (game) {
            navigate("/game")
        })
    }, [])




    return (
        <>{children}</>
    )
}

export default HomeSocketProvider