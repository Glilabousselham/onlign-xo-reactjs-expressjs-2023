import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './pages/login'
import HomePage from './pages/home'
import OnlignUsersSection from './pages/home/sections/OnlignUsersSection'
import RequestsSection from './pages/home/sections/RequestsSection'
import GamePage from './pages/game'
import { useSelector } from 'react-redux'

const App = () => {



    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Guest><LoginPage /></Guest>} />
                <Route path='/game' element={<Auth><GamePage /></Auth>} />
                <Route path='/' element={<Auth><HomePage /></Auth>} >
                    <Route path='' element={<OnlignUsersSection />} />
                    <Route path='requests' element={<RequestsSection />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default App




function Auth({ children }) {

    const userSlice = useSelector(s => s.userSlice)

    const navigate = useNavigate()

    useEffect(() => {
        if (userSlice.checked === false) return;

        if (userSlice.user === null) {
            navigate("/login")
        }
    }, [userSlice.checked])

    return children;
}
function Guest({ children }) {

    const userSlice = useSelector(s => s.userSlice)

    const navigate = useNavigate()

    useEffect(() => {
        if (userSlice.checked === false) return;

        if (userSlice.user !== null) {
            navigate("/")
        }
    }, [userSlice.checked])

    return children;
}