import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../components/buttons';
import DisplayImage from '../../../components/DisplayImage';
import { setUserReady, userLeaveThunk } from '../../../redux/game/gameThunks';
import { setAlert } from '../../../redux/alert/alertSlice';
import { useState } from 'react';

const BeforeReadyPrompt = () => {

    const gameInfo = useSelector(s => s.gameSlice).gameInfo;
    const user = useSelector(s => s.userSlice).user;

    // console.log(gameInfo);


    const hide = gameInfo.playerX.ready && gameInfo.playerO.ready;

    // console.log(gameInfo);

    const d = useDispatch()
    const [l, setL] = useState(false)

    const onReadyButtonClicked = async () => {
        if (l) return;
        try {
            setL(true)
            await d(setUserReady()).unwrap()
        } catch (error) {
            d(setAlert({
                message: error?.data?.message
            }))
        }
        setL(false)
    }
    const onCancelButtonClicked = async () => {
        if (l) return;

        setL(true);
        try {
            await d(userLeaveThunk()).unwrap()

            window.location.reload();

        } catch (error) {
            d(setAlert({
                message: error?.data?.message
            }))
        }
        setL(false);
    }


    const me = gameInfo.playerX._id === user._id ? gameInfo.playerX : gameInfo.playerO
    const opponent = gameInfo.playerX._id !== user._id ? gameInfo.playerX : gameInfo.playerO

    return !hide && (
        <div className='z-10 bg-[#11111145] fixed sm:absolute h-screen sm:h-full w-screen sm:w-full top-0 left-0 flex items-center justify-center p-2'>
            <div className='w-full p-3 bg-white rounded-sm'>
                <div className='font-semibold'>Wait...</div>
                <div className='flex items-center gap-2 mt-3'>
                    <DisplayImage image={me.image} />
                    <div className='font-semibold'>{me.username + " (you)"}</div>
                    <div className='ms-auto px-2 font-semibold text-green-500'>{me.ready ? "Ready" : ""}</div>
                </div>
                <div className='flex items-center gap-2 mt-3'>
                    <DisplayImage image={opponent.image} />
                    <div className='font-semibold'>{opponent.username}</div>
                    <div className='ms-auto px-2 font-semibold text-green-500'>{opponent.ready ? "Ready" : ""}</div>
                </div>
                <div className='flex justify-end gap-2 mt-2'>
                    <Button type={"danger"} onClick={onCancelButtonClicked}>Cancel</Button>
                    <Button disabled={me.ready || l} type={"primary"} onClick={onReadyButtonClicked}>Start</Button>
                </div>
            </div>
        </div >
    )
}

export default BeforeReadyPrompt