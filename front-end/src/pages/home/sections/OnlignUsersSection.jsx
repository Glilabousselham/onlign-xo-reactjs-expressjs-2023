import React, { useEffect, useState } from 'react'
import DisplayImage from '../../../components/DisplayImage'
import Button from '../../../components/buttons'
import ConfirmDialog from '../../../components/confirm'
import Waiting from '../../../components/waiting'
import { useDispatch, useSelector } from 'react-redux'
import { getConnectedUsersThunk } from '../../../redux/users/usersThunks'
import LoadingComponent from '../../../components/loading'
import { deleteSendedRequestThunk, sendRequestThunk } from '../../../redux/requests/requestsThunks'
import { setAlert } from '../../../redux/alert/alertSlice'
import useSocket from '../../../hooks/useSocket'
import { sendedRequestDeleted } from '../../../redux/requests/requestsSlice'



const OnlignUsersSection = () => {

    const [confirmDialog, setConfirmDialog] = useState(null)
    const [waiting, setWaiting] = useState(false);

    const sendedRequest = useSelector(s => s.requestsSlice).sendedRequest
    const d = useDispatch()

    const onConfrim = async () => {
        const userId = confirmDialog;
        try {
            await d(sendRequestThunk(userId)).unwrap()
            setWaiting(true);
        } catch (error) {
            d(setAlert({
                message: error?.data?.message
            }))
        }
        setConfirmDialog(false)
        // do some login to send request
    }

    const onCancel = async () => {

        d(deleteSendedRequestThunk(sendedRequest._id)).unwrap().catch(error => {
            d(setAlert({
                message: error?.data?.message
            }))
        })

        setWaiting(false)
    }

    const socket = useSocket()
    useEffect(() => {
        socket.on("sended-request-deleted", (data) => {
            d(sendedRequestDeleted(data))

            d(setAlert({ message: "the user had refuse your challenge " }))

        })
    }, [])


    const connectedUsers = useSelector(s => s.usersSlice).connectedUsers;

    return (
        <div className='flex flex-col gap-2 relative h-full' >
            {
                !!connectedUsers?.length && connectedUsers.map(user => (
                    <div key={user._id} className='flex justify-between shadow items-center bg-white p-1 rounded-sm' >
                        <div className='flex items-center gap-2'>
                            <DisplayImage image={user.image} />
                            <div>
                                <div className=''>{user.username}</div>
                                <div className='text-sm text-green-600'>onlign now</div>
                            </div>
                        </div>

                        <Button onClick={() => setConfirmDialog(user._id)} type={"primary"}>challenge</Button>
                    </div>
                ))
            }

            <LoadingComponent loading={connectedUsers === null} />

            <ConfirmDialog
                open={!!confirmDialog}
                onCancel={() => {
                    setConfirmDialog(null)
                }}
                message='do you want to challenge this user ?'
                onConfirm={onConfrim} />
            <Waiting open={sendedRequest !== null} onCancel={onCancel} />
        </div >
    )
}

export default OnlignUsersSection