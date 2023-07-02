import React, { useState } from 'react'
import Button from '../../../components/buttons'
import MessageInput from './MessageInput'

const Chat = ({ mute, onMuteChange }) => {

    const [message, setMessage] = useState(false)
    return (
        <>
            <div className='flex justify-end gap-2'>

                <Button type={!mute ? "secondary" : "primary"} onClick={() => onMuteChange(!mute)}>Mute opponent</Button>
                <Button type="primary" onClick={() => setMessage(true)}>Chat</Button>
            </div>
            <MessageInput open={message} onCancel={() => setMessage(false)} />
        </>
    )
}

export default Chat