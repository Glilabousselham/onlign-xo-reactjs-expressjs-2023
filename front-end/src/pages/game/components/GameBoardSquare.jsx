import React from 'react'
import { useSelector } from 'react-redux';

const GameBoardSquare = ({ square }) => {

    const round = useSelector(s => s.gameSlice).gameInfo?.currentRoundInfo ?? null;
    const user = useSelector(s => s.userSlice).user ?? null;

    const onPlay = async () => {
        if (round.positions[square] !== null || round.userTurn._id !== user._id) {
            return;
        }
        console.log(square);
    }

    return (
        <div
            onClick={onPlay}
            key={square}
            className={`w-full bg-gray-200 flex ${round.positions[square] === null ? "cursor-pointer hover:bg-gray-300" : "cursor-not-allowed"} justify-center items-center font-extrabold font-mono text-7xl`}
        >{round.positions[square]}</div>
    )
}

export default GameBoardSquare