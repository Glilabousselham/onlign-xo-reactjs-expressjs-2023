import React from 'react'
import MainLayout from '../../layouts/main-layout'

const LoginPage = () => {
    return (
        <MainLayout>
            <div className='flex flex-col p-2'>
                <div className='text-lg font-bold py-3 mt-5 text-center'>ONLIGN XO GAME</div>

                <form className='mt-16'>
                    <div className='bg-white flex flex-col gap-3 px-2 pt-3 pb-4 rounded-sm'>
                        <div className='w-full text-center py-3 text-lg font-bold' >Login</div>
                        <input className='w-full text-center bg-gray-100 py-3 rounded-sm' type="text" name='username' placeholder='Enter a username' />
                        <input className='w-full text-center bg-gray-100 py-3 rounded-sm' type="password" name='password' placeholder='Enter a password' />
                        <button className='w-full text-center py-3 bg-blue-500 text-white rounded-sm'>Login</button>
                    </div>
                </form>

                <div className='mt-10'>
                    <span className='font-semibold text-black'>Note:</span>
                    <p>the account will be created automaticly if not exists </p>
                </div>
            </div>
        </MainLayout>
    )
}

export default LoginPage