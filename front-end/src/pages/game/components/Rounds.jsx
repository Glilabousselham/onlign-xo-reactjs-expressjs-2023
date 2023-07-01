import React from 'react'
import { useSelector } from 'react-redux';

const Rounds = () => {

    const { maxRounds, currentRound } = useSelector(s => s.gameSlice).gameInfo;

    return (
        <div className='w-full flex justify-between py-4 font-semibold'>
            <div>Round</div>
            <div className='flex gap-2'>
                <span>{currentRound}</span>
                <span>/</span>
                <span>{maxRounds}</span>
            </div>
        </div>
    )
}

export default Rounds