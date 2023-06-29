import React, { useRef } from 'react'
import Button from '../../../components/buttons';

const MessageInput = ({
    open,
    onCancel,
}) => {

    const dRef = useRef(null)

    const handleClose = ({ target }) => {
        if (!dRef.current.contains(target)) onCancel?.();
    }

    const onConfirm = async () => {

        // send message

        // close the popup 
        onCancel?.();
    }

    return open && (
        <div onClick={handleClose} className='z-10 bg-[#11111144] fixed sm:absolute h-screen sm:h-full w-screen sm:w-full top-0 left-0 flex items-center justify-center p-2'>
            <div ref={dRef} className='w-full p-3  bg-white rounded-sm'>
                <input className='border rounded-sm w-full px-2 py-2 ' type="text" placeholder='type message...' />
                <div className='flex justify-end gap-2 mt-2'>
                    <Button type={"primary"} onClick={onConfirm}>Send</Button>
                </div>
            </div>
        </div>
    )
}

export default MessageInput