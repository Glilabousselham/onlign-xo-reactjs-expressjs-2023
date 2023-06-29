import React from 'react'
import { MdEdit, MdPerson } from "react-icons/md"
const DisplayImage = ({ image, editable }) => {
    return (
        <div className='relative w-fit'>
            <div className='rounded-full overflow-hidden w-12 h-12 border border-blue-500 text-blue-500 flex justify-center items-center'>
                {image ? (
                    <img src={image} alt="" className='h-full w-full  object-cover' />
                ) : (
                    <MdPerson className='text-3xl ' />
                )}
            </div>
            {editable && <MdEdit className='bg-blue-500 text-white cursor-pointer p-[2px] absolute border border-blue-500 rounded-full top-[31px] right-0' />}
        </div>
    )
}

export default DisplayImage