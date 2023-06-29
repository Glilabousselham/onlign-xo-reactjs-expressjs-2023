import React, { useState } from 'react'
import { MdMenu } from "react-icons/md"
import ConfirmDialog from '../../../components/confirm'
import { useNavigate } from 'react-router-dom'
const Header = () => {


    const navigate = useNavigate()
    const [confirmDialog, setConfirmDialog] = useState(false)
    const onConfrim = async () => {
        // do some thing 

        // close
        setConfirmDialog(false);

        // navigate to home 
        navigate("/")
    }
    return (
        <>
            <div className='w-full flex items-center justify-between'>
                <div className='font-bold'>ONLIGN XO GAME</div>
                <div onClick={() => setConfirmDialog(true)} className='text-red-500 bg-white rounded-sm px-2 py-1 font-semibold cursor-pointer hover:bg-red-500 hover:text-white active:bg-red-400'>Leave</div>
            </div>
            <ConfirmDialog
                open={confirmDialog}
                onCancel={() => {
                    setConfirmDialog(false)
                }}
                message='are you sure you want to leave the match?'
                onConfirm={onConfrim} />
        </>
    )
}

export default Header