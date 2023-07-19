import React, { useEffect, useState } from 'react'
import DisplayImage from '../../../components/DisplayImage'
import { useSelector } from 'react-redux'
import useSocket from '../../../hooks/useSocket'

import { TbMessageCircle2, TbMessageCircleOff } from "react-icons/tb"

const Score = ({ mute }) => {

    const gameInfo = useSelector(s => s.gameSlice).gameInfo
    const user = useSelector(s => s.userSlice).user

    const socket = useSocket()

    const [message, setMessage] = useState(null)
    const [timeoutId, setTimeoutId] = useState(null)
    useEffect(() => {
        socket.on('GameMessageEvent', (message) => {

            setMessage(message)

            if (timeoutId) {
                clearTimeout(timeoutId)
            }

            setTimeoutId(setTimeout(() => {
                setMessage(null)
                setTimeoutId(null)
            }, 5000))
        })
    }, [])


    const me = gameInfo.playerX._id === user._id ? gameInfo.playerX : gameInfo.playerO
    const opponent = gameInfo.playerX._id !== user._id ? gameInfo.playerX : gameInfo.playerO


    return (
        <div className='flex justify-between items-center font-semibold p-1 bg-white mt-2 rounded-sm'>
            <div className='flex w-[40%] justify-start items-center gap-2 relative line-clamp-2'>
                <DisplayImage image={opponent.image ?? null} />
                <div className=''>{opponent.username}({opponent.type})</div>
                {(!mute && message) && <div onClick={() => setMessage(null)} className='absolute left-0 top-12 line-clamp-4 bg-blue-400 text-white w-fit px-2 rounded-sm py-1 shadow max-w-[300px]'>
                    {message}
                </div>}
            </div>
            <div className='flex w-[20%] justify-center font-bold gap-2'>
                <span>{opponent.score}</span>
                <span>-</span>
                <span>{me.score}</span>
            </div>
            <div className='flex w-[40%]  justify-end items-center gap-2 '>
                <div className=''>You({me.type})</div>
                <DisplayImage image={me.image ?? null} />

            </div>
        </div>
    )
}

export default Score