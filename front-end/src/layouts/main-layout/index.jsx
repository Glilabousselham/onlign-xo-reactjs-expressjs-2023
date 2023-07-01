import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedUserThunk } from '../../redux/user/userThunks'
import SplashScreen from '../../components/splash-screen'
import Alert from '../../components/alerts'
import { hideAlert, setAlert } from '../../redux/alert/alertSlice'
import { checkIsGameStartingThunk } from '../../redux/game/gameThunks'
import { useRouteHook } from '../../hooks/useRouteHook'
import { useNavigate } from 'react-router-dom'

// classes

const sm_classes = `
    sm:max-w-[400px] sm:mx-auto sm:max-h-[1000px]
`
const normal_classes = `
    w-screen h-screen bg-gray-200 text-gray-600 select-none relative
`

const MainLayout = ({ children }) => {

    const userChecked = useSelector(s => s.userSlice).checked
    const gameChecked = useSelector(s => s.gameSlice).checked
    const gameInfo = useSelector(s => s.gameSlice).gameInfo

    const d = useDispatch()

    const alert = useSelector(s => s.alertSlice).alert

    useEffect(() => {
        if (userChecked === true) return;
        d(getLoggedUserThunk())

    }, [])


    const routeHook = useRouteHook()

    const navigate = useNavigate()

    useEffect(() => {
        if (userChecked === false || gameChecked === true) return

        d(checkIsGameStartingThunk())

    }, [userChecked])

    useEffect(() => {
        if (gameInfo !== null && !routeHook.isRoute("/game")) {
            d(setAlert({
                message: "there is a game starting right now click ok to continue playing",
            }))
            navigate("/game");
        };

    }, [gameInfo])


    return (
        <div className={`
        ${normal_classes} 
        ${sm_classes}
        `}>
            {userChecked === false ? (
                <SplashScreen />
            ) : children}

            <Alert {...alert} onCancel={() => {
                d(hideAlert())
            }} />
        </div>
    )
}

export default MainLayout