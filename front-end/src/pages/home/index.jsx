import React, { useEffect } from 'react'
import MainLayout from '../../layouts/main-layout'
import HomeHeader from './components/header'
import NavButtons from './components/nav-buttons'
import { Outlet } from 'react-router-dom'
import SocketClient from '../../socket/SocketClient'
import useSocket from '../../hooks/useSocket'

const HomePage = () => {

    const socket = useSocket()


    socket.on('message', function (data) {
        console.log(data);
    })



    return (
        <MainLayout>
            <div className='p-2 h-full flex flex-col'>
                <HomeHeader />
                <div className='rounded-t-sm mt-5 overflow-hidden bg-white h-full'>
                    <NavButtons />
                    <div className='h-full p-1 overflow-hidden overflow-y-auto'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default HomePage