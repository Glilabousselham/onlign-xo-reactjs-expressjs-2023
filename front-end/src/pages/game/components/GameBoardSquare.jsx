import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userPlayThunk } from '../../../redux/game/gameThunks';

const GameBoardSquare = ({ square }) => {

    const round = useSelector(s => s.gameSlice).gameInfo?.currentRoundInfo ?? null;
    const user = useSelector(s => s.userSlice).user ?? null;
    const d = useDispatch()
    const onPlay = async () => {
        if (round.positions[square] !== null || round.userTurn._id !== user._id) {
            return;
        }

        d(userPlayThunk(square))
    }

    return (
        <div
            onClick={onPlay}
            key={square}
            className={`w-full h-[130px] bg-gray-200 flex flex-none p-0 
            ${round.positions[square] === null ? "cursor-pointer hover:bg-gray-300" : "cursor-not-allowed"}
             justify-center items-center font-extrabold font-mono text-6xl`}
        >{round.positions[square]}</div>
    )
}

export default GameBoardSquare