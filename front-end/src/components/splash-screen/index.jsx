import React from 'react'
import styles from "./style.module.css"
const SplashScreen = () => {
    return (
        <div className='absolute flex items-center top-0 left-0 h-full w-full bg-gray-200'>
            <div className='w-full mt-[-100px]'>
                <div className='text-center font-bold text-blue-500 text-3xl'>ONLIGN XO GAME</div>
                <div className='text-center mt-2'>devlopped by glila bousselham</div>
                <div className='text-center mt-4'>wait a second...</div>

                <div className='flex justify-center items-center mt-4'>
                    <div className={`
                    p-10 border-8 border-b-transparent rounded-full  border-blue-500 
                    ${styles.loading}
                    `}></div>
                </div>

            </div>
        </div>
    )
}

export default SplashScreen