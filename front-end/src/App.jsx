import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login'
import HomePage from './pages/home'
import OnlignUsersSection from './pages/home/sections/OnlignUsersSection'
import RequestsSection from './pages/home/sections/RequestsSection'
import GamePage from './pages/game'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/game' element={<GamePage />} />
                <Route path='/' element={<HomePage />} >
                    <Route path='' element={<OnlignUsersSection />} />
                    <Route path='requests' element={<RequestsSection />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default App