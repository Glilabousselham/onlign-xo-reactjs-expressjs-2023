import React, { useRef } from 'react'
import Button from '../buttons'

const ConfirmDialog = ({
    open,
    onConfirm,
    onCancel,
    message = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique, temporibus.",

}) => {

    const dRef = useRef(null)

    const handleClose = ({ target }) => {
        if (!dRef.current.contains(target)) onCancel?.();
    }


    return open && (
        <div onClick={handleClose} className='z-10 bg-[#11111144] fixed sm:absolute h-screen sm:h-full w-screen sm:w-full top-0 left-0 flex items-center justify-center p-2'>
            <div ref={dRef} className='w-full p-3 bg-white rounded-sm'>
                <div className='text-black '>Confirmation!</div>
                <div className='text-sm py-3'>{message}</div>
                <div className='flex justify-end gap-2'>
                    <Button type={"secondary"} onClick={onCancel}>Cancel</Button>
                    <Button type={"primary"} onClick={onConfirm}>Confirm</Button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog