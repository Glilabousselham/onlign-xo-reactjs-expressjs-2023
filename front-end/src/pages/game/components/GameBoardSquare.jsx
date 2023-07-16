import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userPlayThunk } from '../../../redux/game/gameThunks';
import LoadingComponent from '../../../components/loading';

const GameBoardSquare = ({ square }) => {

    const round = useSelector(s => s.gameSlice).gameInfo?.currentRoundInfo ?? null;
    const user = useSelector(s => s.userSlice).user ?? null;
    const d = useDispatch()
    const [loading, setLoading] = useState(false);
    const onPlay = async () => {
        if (round.positions[square] !== null || round.userTurn._id !== user._id) {
            return;
        }

        try {
            setLoading(true)
            await d(userPlayThunk(square)).unwrap()
        } catch (error) { }
        setLoading(false)
    }

    return (
        <div
            onClick={onPlay}
            key={square}
            className={`w-full h-[130px] bg-gray-200 flex flex-none p-0  relative
            ${round.positions[square] === null ? "cursor-pointer hover:bg-gray-300" : "cursor-not-allowed"}
             justify-center items-center font-extrabold font-mono text-6xl`}
        >

            {round.positions[square]}
            <LoadingComponent loading={loading} />
        </div>
    )
}

export default GameBoardSquare