import React from 'react'
import DisplayImage from '../../../components/DisplayImage'
import Button from '../../../components/buttons'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'

const OnPlayerWinInRound = () => {

    const gameInfo = useSelector(s => s.gameSlice).gameInfo;
    const user = useSelector(s => s.userSlice).user;



    const [show, setShow] = useState(false)


    useEffect(() => {
        if (Object.values(gameInfo.currentRoundInfo.positions).findIndex(p => p !== null) === -1 && gameInfo.currentRound !== 1) {
            setShow(true)
        }
    }, [gameInfo.currentRoundInfo])


    if (show === false) return null;

    const { winnerUser } = gameInfo.rounds[gameInfo.currentRound - 2];
    return (
        <div className='z-10 bg-[#11111145] fixed sm:absolute h-screen sm:h-full w-screen sm:w-full top-0 left-0 flex items-center justify-center p-2'>
            <div className='w-full p-3 bg-white rounded-sm'>
                <div className='font-semibold flex justify-center py-4 text-2xl'>
                    {winnerUser === null && <div className='text-blue-500'>DRAW</div>}
                    {winnerUser?._id === user._id && <div className='text-green-600'>You won</div>}
                    {(winnerUser !== null && winnerUser?._id !== user._id) && <div className='text-red-600'>You lost</div>}
                </div>

                <div className='flex justify-center gap-2 mt-2'>
                    <Button type={"primary"} onClick={() => { setShow(false) }}>Ok</Button>
                </div>
            </div>
        </div>
    )
}

export default OnPlayerWinInRound