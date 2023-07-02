import React from 'react'
import DisplayImage from '../../../components/DisplayImage'
import Button from '../../../components/buttons'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'

const PlayerLeftAlert = () => {

    const gameInfo = useSelector(s => s.gameSlice).gameInfo;
    const user = useSelector(s => s.userSlice).user;


    const show = Boolean(gameInfo.playerXLeft) || Boolean(gameInfo.playerOLeft)

    if (show === false) return null;

    return (
        <div className='z-10 bg-[#11111145] fixed sm:absolute h-screen sm:h-full w-screen sm:w-full top-0 left-0 flex items-center justify-center p-2'>
            <div className='w-full p-3 bg-white rounded-sm'>
                <div className='font-semibold flex justify-center py-4 text-md'>
                    the opponent was left the game

                </div>
                <div className='text-center font-bold mb-3 text-green-500'>You Won</div>
                <div className='flex justify-center gap-2 mt-2'>
                    <Button type={"primary"} onClick={() => { window.location.reload() }}>Ok</Button>
                </div>
            </div>
        </div>
    )
}

export default PlayerLeftAlert