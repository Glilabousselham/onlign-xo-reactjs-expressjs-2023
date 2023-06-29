import React, { useState } from 'react'
import DisplayImage from '../../../components/DisplayImage'
import Button from '../../../components/buttons'
import Waiting from '../../../components/waiting'
import { useNavigate } from 'react-router-dom'

const requests = [
    {
        id: 1,
        sender: {
            id: 1,
            username: 'hamza',
            image: false,
        },
    },
    {
        id: 2,
        sender: {
            id: 1,
            username: 'salim',
            image: false,
        },
    }
]

const RequestsSection = () => {
    const [waiting, setWaiting] = useState(false);
    const navigate = useNavigate()
    const onAccept = async () => {
        setWaiting(true);
        // do some thing
        setWaiting(false)

        navigate("/game")
    }

    const onDelete = async () => {
        setWaiting(true);

    }

    return (
        <div className='flex flex-col gap-2' >
            {
                requests.map(request => (
                    <div key={request.id} className='flex justify-between items-center shadow-sm gap-1 bg-gray-100 p-1 rounded-sm' >
                        <div className='flex items-center gap-2'>
                            <DisplayImage image={request.sender.image} />
                            <div className=''>{request.sender.username}</div>
                        </div>

                        <div className='flex gap-1 justify-end'>
                            <Button onClick={onDelete} type={"secondary"}>delete</Button>
                            <Button onClick={onAccept} type={"primary"}>accept</Button>
                        </div>
                    </div>
                ))
            }

            <Waiting open={waiting} message='please wait...' />

        </div >
    )

}

export default RequestsSection