import React from 'react'
import MainLayout from '../../layouts/main-layout'
import Header from './components/Header'
import Score from './components/Score'
import Rounds from './components/Rounds'
import Chat from './components/Chat'
import GameBoard from './components/GameBoard'
import Turns from './components/Turns'

const GamePage = () => {
    return (
        <MainLayout>
            <div className='p-2 flex flex-col h-full'>
                <Header />
                <Score />
                <Rounds />
                <Chat />
                <GameBoard />
                <Turns />

            </div>
        </MainLayout>
    )
}

export default GamePage