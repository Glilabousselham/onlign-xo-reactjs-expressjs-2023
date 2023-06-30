import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedUserThunk } from '../../redux/user/userThunks'
import SplashScreen from '../../components/splash-screen'
import Alert from '../../components/alerts'
import { hideAlert } from '../../redux/alert/alertSlice'

// classes

const sm_classes = `
    sm:max-w-[400px] sm:mx-auto sm:max-h-[1000px]
`
const normal_classes = `
    w-screen h-screen bg-gray-200 text-gray-600 select-none relative
`

const MainLayout = ({ children }) => {

    const checked = useSelector(s => s.userSlice).checked

    const d = useDispatch()

    const alert = useSelector(s => s.alertSlice).alert

    useEffect(() => {
        if (checked === true) return;
        d(getLoggedUserThunk())
    }, [])

    return (
        <div className={`
        ${normal_classes} 
        ${sm_classes}
        `}>
            {checked === false ? (
                <SplashScreen />
            ) : children}

            <Alert {...alert} onCancel={() => {
                d(hideAlert())
            }} />
        </div>
    )
}

export default MainLayout