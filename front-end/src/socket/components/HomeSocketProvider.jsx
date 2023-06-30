import React, { useEffect } from 'react'
import useSocket from '../../hooks/useSocket'
import { useDispatch } from "react-redux"
import { newUserConnected, newUserDisconnected } from '../../redux/users/usersSlice'
import { newRequestDeleted, newRequestReceived, sendedRequestDeleted } from '../../redux/requests/requestsSlice'

const HomeSocketProvider = ({ children }) => {

    const socket = useSocket()

    const d = useDispatch()
    useEffect(() => {
        socket.on('new-request', function (data) {
            d(newRequestReceived(data))
        })
        socket.on('received-request-deleted', function (data) {
            d(newRequestDeleted(data))
        })
        socket.on('sended-request-deleted', function (data) {
            d(sendedRequestDeleted(data))
        })
        socket.on('sended-request-accepted', function (data) {
            window.location.reload() // reload the page 
        })
        socket.on('new-user-connection', function (user) {
            d(newUserConnected(user))
        })
        socket.on('new-user-disconnected', function (user) {
            d(newUserDisconnected(user))
        })
    }, [])




    return (
        <>{children}</>
    )
}

export default HomeSocketProvider