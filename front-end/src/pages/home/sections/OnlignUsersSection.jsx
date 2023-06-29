import React, { useState } from 'react'
import DisplayImage from '../../../components/DisplayImage'
import Button from '../../../components/buttons'
import ConfirmDialog from '../../../components/confirm'
import Waiting from '../../../components/waiting'


const users = [
    {
        id: 1,
        username: 'hamza',
        image: false,
    },
    {
        id: 2,
        username: 'yahya',
        image: false,
    },
    {
        id: 3,
        username: 'adil',
        image: false,
    },
]


const OnlignUsersSection = () => {

    const [confirmDialog, setConfirmDialog] = useState(null)
    const [waiting, setWaiting] = useState(false);

    const onConfrim = async () => {
        const userId = confirmDialog;
        setConfirmDialog(null)

        // do some login to send request
        setWaiting(true);


    }
    return (
        <div className='flex flex-col gap-2' >
            {
                users.map(user => (
                    <div key={user.id} className='flex justify-between shadow-sm items-center bg-gray-100 p-1 rounded-sm' >
                        <div className='flex items-center gap-2'>
                            <DisplayImage image={user.image} />
                            <div className=''>{user.username}</div>
                        </div>

                        <Button onClick={() => setConfirmDialog(user.id)} type={"primary"}>challenge</Button>
                    </div>
                ))
            }

            <ConfirmDialog
                open={!!confirmDialog}
                onCancel={() => {
                    setConfirmDialog(null)
                }}
                message='do you want to challenge this user ?'
                onConfirm={onConfrim} />
            <Waiting open={waiting} onCancel={() => { setWaiting(false) }} />
        </div >
    )
}

export default OnlignUsersSection