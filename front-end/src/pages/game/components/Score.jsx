import React from 'react'
import DisplayImage from '../../../components/DisplayImage'
import { useSelector } from 'react-redux'

const Score = () => {

    const gameInfo = useSelector(s => s.gameSlice).gameInfo
    const user = useSelector(s => s.userSlice).user


    return (
        <div className='flex justify-between items-center font-semibold p-1 bg-white mt-2 rounded-sm'>
            <div className='flex w-[40%] justify-start items-center gap-2'>
                <DisplayImage image={null} />
                <div className=''>{gameInfo.playerX._id === user._id ? "You" : gameInfo.playerX.username}(x)</div>
            </div>
            <div className='flex w-[20%] justify-center font-bold gap-2'>
                <span>{gameInfo.playerX.score}</span>
                <span>-</span>
                <span>{gameInfo.playerO.score}</span>
            </div>
            <div className='flex w-[40%]  justify-end items-center gap-2'>
                <div className=''>{gameInfo.playerO._id === user._id ? "You" : gameInfo.playerX.username}(o)</div>
                <DisplayImage image={null} />
            </div>
        </div>
    )
}

export default Score