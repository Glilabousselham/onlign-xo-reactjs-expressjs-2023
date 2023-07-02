import React, { useEffect } from 'react'
import MainLayout from '../../layouts/main-layout'
import Header from './components/Header'
import Score from './components/Score'
import Rounds from './components/Rounds'
import Chat from './components/Chat'
import GameBoard from './components/GameBoard'
import Turns from './components/Turns'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BeforeReadyPrompt from './components/BeforeReadyPrompt'
import OnPlayerWinInRound from './components/OnPlayerWinInRound'
import GameFinishedAlert from './components/GameFinishedAlert'
import PlayerLeftAlert from './components/PlayerLeftAlert'
import { useState } from 'react'

const GamePage = () => {

    const { gameInfo, checked } = useSelector(s => s.gameSlice);

    const navigate = useNavigate()
    useEffect(() => {

        if (checked === false) return;

        if (gameInfo === null) {
            navigate("/")
        }

    }, [gameInfo, checked])

    const [mute, setMute] = useState(false)

    return (
        <MainLayout>
            {gameInfo !== null && (
                <div className='p-2 flex flex-col h-full'>
                    <Header />
                    <Score mute={mute} />
                    <Rounds />
                    <Chat mute={mute} onMuteChange={(m) => setMute(m)} />
                    <GameBoard />
                    <Turns />
                    <BeforeReadyPrompt />
                    <OnPlayerWinInRound />
                    <GameFinishedAlert />
                    <PlayerLeftAlert />
                </div>
            )}
        </MainLayout>
    )
}

export default GamePage