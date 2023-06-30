import React, { useEffect } from 'react'
import MainLayout from '../../layouts/main-layout'
import HomeHeader from './components/header'
import NavButtons from './components/nav-buttons'
import { Outlet } from 'react-router-dom'
import SocketClient from '../../socket/SocketClient'
import useSocket from '../../hooks/useSocket'
import { useDispatch, useSelector } from 'react-redux'
import { getConnectedUsersThunk } from '../../redux/users/usersThunks'
import { checkSendedRequestThunk, getAllRequestsThunk } from '../../redux/requests/requestsThunks'
import { setAlert } from '../../redux/alert/alertSlice'
import HomeSocketProvider from '../../socket/components/HomeSocketProvider'

const HomePage = () => {

    const socket = useSocket()


    socket.on('message', function (data) {
        console.log(data);
    })

    const d = useDispatch()

    const requests = useSelector((s) => s.requestsSlice).allRequests

    const connectedUsers = useSelector(s => s.usersSlice).connectedUsers;
    useEffect(() => {
        if (connectedUsers === null) {
            d(getConnectedUsersThunk()).catch(error => {
                d(setAlert({
                    message: error?.data?.message
                }))
            })
        }
        if (requests === null) {
            d(getAllRequestsThunk()).catch(error => {
                d(setAlert({
                    message: error?.data?.message
                }))
            })
        }

        d(checkSendedRequestThunk())
    }, [])




    return (
        <HomeSocketProvider>
            <MainLayout>
                <div className='p-2 h-full flex flex-col'>
                    <HomeHeader />
                    <div className='rounded-t-sm mt-5 overflow-hidden bg-white h-full'>
                        <NavButtons />
                        <div className='h-full p-1 pt-2 overflow-hidden overflow-y-auto'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </MainLayout>
        </HomeSocketProvider>
    )
}

export default HomePage