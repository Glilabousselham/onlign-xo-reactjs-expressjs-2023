import React, { useState } from 'react'
import DisplayImage from '../../../../components/DisplayImage'
import Button from '../../../../components/buttons'
import Waiting from '../../../../components/waiting';
import { useSelector } from 'react-redux';
import ConfirmDialog from '../../../../components/confirm';

const HomeHeader = () => {

    const user = useSelector(store => store.userSlice).user;

    const [waiting, setWaiting] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);

    const onLogout = async () => {
        setConfirmDialog(true)
    }

    const onConfirmLogout = () => {
        window.localStorage.removeItem('token')
        window.location.reload()
    }
    return (
        <>
            <div className='flex justify-between items-center bg-white p-1 rounded-sm'>
                <div className='flex gap-2 items-center '>
                    <DisplayImage editable image={user.image} />
                    <div className='font-semibold'>{user?.username}</div>
                </div>

                <Button onClick={onLogout} type={'primary'}>logout</Button>

            </div>
            <Waiting open={waiting} />
            <ConfirmDialog
                open={confirmDialog}
                onCancel={() => {
                    setConfirmDialog(false)
                }}
                message='are you sure you want to logout?'
                onConfirm={onConfirmLogout} />
        </>
    )
}

export default HomeHeader