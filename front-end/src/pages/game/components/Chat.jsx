import React, { useState } from 'react'
import Button from '../../../components/buttons'
import MessageInput from './MessageInput'

const Chat = () => {

    const [message, setMessage] = useState(false)
    return (
        <>
            <div className='flex justify-end'>
                <Button type="primary" onClick={() => setMessage(true)}>Chat</Button>
            </div>
            <MessageInput open={message} onCancel={() => setMessage(false)} />
        </>
    )
}

export default Chat