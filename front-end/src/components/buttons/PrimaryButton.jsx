import React from 'react'

const PrimaryButton = ({ children, ...props }) => {
    return (
        <button  {...props} className='transition-all duration-300 px-2 py-1 rounded-sm text-sm text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-400' >{children}</button>
    )
}

export default PrimaryButton