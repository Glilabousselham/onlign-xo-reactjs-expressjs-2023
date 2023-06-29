import React, { useRef } from 'react'
import Button from '../buttons'

const Waiting = ({
    open,
    onCancel,
    message = "wait for opponent..."
}) => {


    return open && (
        <div className='z-10 bg-[#11111144] fixed sm:absolute h-screen sm:h-full w-screen sm:w-full top-0 left-0 flex items-center justify-center p-2'>
            <div className='w-full p-3 bg-white rounded-sm'>
                {/* <div className='text-black '>Alert!</div> */}
                <div className='text-sm py-3 text-center'>{message}</div>
                <div className='flex justify-center gap-2'>
                    {!!onCancel && <Button type={"secondary"} onClick={onCancel}>Cancel</Button>}
                </div>
            </div>
        </div>
    )
}

export default Waiting