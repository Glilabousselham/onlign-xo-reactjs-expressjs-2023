import React from 'react'
import DisplayImage from '../../../components/DisplayImage'

const Score = () => {
    return (
        <div className='flex justify-between items-center font-semibold p-1 bg-white mt-2 rounded-sm'>
            <div className='flex w-[40%] justify-start items-center gap-2'>
                <DisplayImage image={null} />
                <div className=''>you(x)</div>
            </div>
            <div className='flex w-[20%] justify-center font-bold gap-2'>
                <span>3</span>
                <span>-</span>
                <span>1</span>
            </div>
            <div className='flex w-[40%]  justify-end items-center gap-2'>
                <div className=''>fatima(o)</div>
                <DisplayImage image={null} />
            </div>
        </div>
    )
}

export default Score