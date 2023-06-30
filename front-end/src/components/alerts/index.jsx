import React, { useRef } from 'react'
import Button from '../buttons';

const Alert = ({
    open,
    onCancel,
    title,
    onHide,
    message = "wait for opponent..."
}) => {

    const dRef = useRef(null)

    const onClose = () => {
        onCancel?.()
        onHide?.()
    }


    const handleClose = ({ target }) => {
        if (!dRef.current.contains(target)) onClose();
    }

    return open && (
        <div onClick={handleClose} className='z-10 bg-[#11111144] fixed sm:absolute h-screen sm:h-full w-screen sm:w-full top-0 left-0 flex items-center justify-center p-2'>
            <div ref={dRef} className='w-full p-3 bg-white rounded-sm'>
                <div className='text-black '>{title}</div>
                <div className='text-sm py-3 '>{message}</div>
                <div className='flex justify-center gap-2'>
                    <Button type={"primary"} onClick={onClose}>Ok</Button>
                </div>
            </div>
        </div>
    )
}

export default Alert