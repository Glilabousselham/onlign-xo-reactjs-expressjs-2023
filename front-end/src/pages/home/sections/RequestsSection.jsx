import React, { useState } from 'react'
import DisplayImage from '../../../components/DisplayImage'
import Button from '../../../components/buttons'
import Waiting from '../../../components/waiting'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { acceptReceivedRequestThunk, deleteReceivedRequestThunk, getAllRequestsThunk } from '../../../redux/requests/requestsThunks'
import { setAlert } from '../../../redux/alert/alertSlice'
import LoadingComponent from '../../../components/loading'



const RequestsSection = () => {
    const [waiting, setWaiting] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const d = useDispatch()
    const onAccept = async (id) => {
        setWaiting(true);
        // do some thing

        try {
            await d(acceptReceivedRequestThunk(id)).unwrap()
            window.location.reload()
        } catch (error) {
            d(setAlert({
                message: error?.data?.message
            }))
        }

        setWaiting(false)
    }

    const onDelete = async (id) => {
        setLoading(true);

        try {
            await d(deleteReceivedRequestThunk(id)).unwrap()
        } catch (error) {
            d(setAlert({
                message: error?.data?.message
            }))
        }
        setLoading(false)

    }


    const requests = useSelector((s) => s.requestsSlice).allRequests

    return (
        <div className='flex flex-col gap-2 h-full' >
            {
                !!requests?.length && requests.map(request => (
                    <div key={request._id} className='flex justify-between items-center shadow-sm gap-1 bg-gray-100 p-1 rounded-sm' >
                        <div className='flex items-center gap-2'>
                            <DisplayImage image={request.sender.image} />
                            <div className=''>{request.sender.username}</div>
                        </div>

                        <div className='flex gap-1 justify-end'>
                            <Button onClick={() => onDelete(request._id)} type={"secondary"}>delete</Button>
                            <Button onClick={() => onAccept(request._id)} type={"primary"}>accept</Button>
                        </div>
                    </div>
                ))
            }

            <Waiting open={waiting} message='please wait...' />
            <LoadingComponent loading={requests === null} />

        </div >
    )

}

export default RequestsSection