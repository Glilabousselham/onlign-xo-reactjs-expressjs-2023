import React, { useRef, useState } from 'react'
import MainLayout from '../../layouts/main-layout'
import { useDispatch, useSelector } from 'react-redux'
import { loginThunk } from '../../redux/user/userThunks'

const LoginPage = () => {

    const loading = useSelector(s => s.userSlice).loading

    const [errors, setErrors] = useState(null)

    const usernameRef = useRef(null)
    const passwordRef = useRef(null)


    const d = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors(null)
        try {
            await d(loginThunk({
                username: usernameRef.current?.value,
                password: passwordRef.current?.value
            })).unwrap();

            window.location.reload()

        } catch (error) {
            if (error.status === 400) {
                // validation error
                setErrors(error.data.errors)
            }
        }



    }





    return (
        <MainLayout>
            <div className='flex flex-col p-2'>
                <div className='text-lg font-bold py-3 mt-5 text-center'>ONLIGN XO GAME</div>

                <form className='mt-16' onSubmit={onSubmit}>
                    <div className='bg-white flex flex-col gap-3 px-2 pt-3 pb-4 rounded-sm'>
                        <div className='w-full text-center py-3 text-lg font-bold' >Login</div>
                        <div>
                            <input autoComplete='false' ref={usernameRef} className='w-full text-center bg-gray-100 py-3 rounded-sm' type="text" name='username' placeholder='Enter a username' />
                            {errors?.username && <p className='text-red-500'>{errors?.username}</p>}
                        </div>
                        <div>
                            <input autoComplete='false' ref={passwordRef} className='w-full text-center bg-gray-100 py-3 rounded-sm' type="password" name='password' placeholder='Enter a password' />
                            {errors?.password && <p className='text-red-500'>{errors?.password}</p>}
                        </div>
                        <button className={`w-full text-center py-3 ${loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600 active:bg-blue-300"} text-white rounded-sm`}>
                            {loading ? "loading..." : "Login"}
                        </button>
                    </div>
                </form>

                <div className='mt-10'>
                    <span className='font-semibold text-black'>Note:</span>
                    <p>the account will be created automaticly if not exists </p>
                </div>
            </div >
        </MainLayout >
    )
}

export default LoginPage