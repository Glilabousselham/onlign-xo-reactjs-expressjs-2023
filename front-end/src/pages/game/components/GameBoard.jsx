import React from 'react'

import GameBoardSquare from './GameBoardSquare';
import { useSelector } from 'react-redux';

const GameBoard = () => {
    const round = useSelector(s => s.gameSlice).gameInfo?.currentRoundInfo ?? null;

    return (
        <div className='grid grid-cols-3 h-full max-h-[400px] gap-1 p-1 rounded-sm mt-4 bg-white '>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(square => (
                <GameBoardSquare key={square} square={square} />
            ))}
        </div>
    )
}

export default GameBoard