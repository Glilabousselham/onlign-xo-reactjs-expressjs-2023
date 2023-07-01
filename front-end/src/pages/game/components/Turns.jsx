import React from 'react'
import { useSelector } from 'react-redux'

const Turns = () => {

    const round = useSelector(s => s.gameSlice).gameInfo.currentRoundInfo;
    const user = useSelector(s => s.userSlice).user;

    const isMyTurn = round.userTurn._id === user._id

    return (
        <div className='py-2 flex items-center justify-center'>
            <div className={`font-semibold text-white px-3 py-1 rounded-sm ${isMyTurn ? "bg-green-500" : "bg-red-500"}`}>{isMyTurn ? "Your turn" : "Opponent turn"}</div>
        </div>
    )
}

export default Turns