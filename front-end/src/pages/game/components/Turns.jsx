import React from 'react'
import { useSelector } from 'react-redux'

const Turns = () => {

    const gameInfo = useSelector(s => s.gameSlice).gameInfo;
    const user = useSelector(s => s.userSlice).user;

    const isMyTurn = gameInfo.currentRoundInfo.userTurn._id === user._id

    const started = gameInfo.playerX.ready && gameInfo.playerO.ready

    return (
        <div className='py-2 flex items-center justify-center'>
            {started && <div className={`font-semibold text-white px-3 py-1 rounded-sm ${isMyTurn ? "bg-green-500" : "bg-red-500"}`}>{isMyTurn ? "Your turn" : "Opponent turn"}</div>}
        </div>
    )
}

export default Turns