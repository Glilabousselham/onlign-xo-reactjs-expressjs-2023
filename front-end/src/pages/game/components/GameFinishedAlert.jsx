import React from 'react'
import DisplayImage from '../../../components/DisplayImage'
import Button from '../../../components/buttons'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'

const GameFinishedAlert = () => {

    const gameInfo = useSelector(s => s.gameSlice).gameInfo;
    const user = useSelector(s => s.userSlice).user;

    if (Boolean(gameInfo.finished) === Boolean(false)) return null;

    let winnerUser = null;
    if (gameInfo.playerX.score > gameInfo.playerO.score) {
        winnerUser = gameInfo.playerX;
    } else if (gameInfo.playerX.score < gameInfo.playerO.score) {
        winnerUser = gameInfo.playerO;
    }

    const onClickOk = () => {
        window.location.reload();
    }
    return (
        <div className='z-10 bg-[#11111145] fixed sm:absolute h-screen sm:h-full w-screen sm:w-full top-0 left-0 flex items-center justify-center p-2'>
            <div className='w-full px-3 py-6 bg-white rounded-sm' >
                <div className='font-semibold flex items-center flex-col justify-center  text-2xl'>

                    <div>Game ended</div>
                    {winnerUser === null && <div className='text-blue-500'>DRAW</div>}
                    {winnerUser?._id === user._id && <div className='text-green-600'>You won</div>}
                    {(winnerUser !== null && winnerUser?._id !== user._id) && <div className='text-red-600'>You lost</div>}
                </div>
                <div className='flex justify-between items-center font-normal p-1 bg-white mt-2 rounded-sm'>
                    <div className='flex w-[40%] justify-center items-center gap-2'>
                        {/* <DisplayImage image={null} /> */}
                        <div className=''>{gameInfo.playerX._id === user._id ? "You" : gameInfo.playerX.username}(x)</div>
                    </div>
                    <div className='flex w-[20%] justify-center gap-2'>
                        <span>{gameInfo.playerX.score}</span>
                        <span>-</span>
                        <span>{gameInfo.playerO.score}</span>
                    </div>
                    <div className='flex w-[40%]  justify-center items-center gap-2'>
                        <div className=''>{gameInfo.playerO._id === user._id ? "You" : gameInfo.playerX.username}(o)</div>
                        {/* <DisplayImage image={null} /> */}
                    </div>
                </div>

                <div className='flex justify-center gap-2 mt-2'>
                    <Button type={"primary"} onClick={onClickOk}>Ok</Button>
                </div>
            </div>
        </div>
    )
}

export default GameFinishedAlert