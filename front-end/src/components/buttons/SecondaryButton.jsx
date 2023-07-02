import React from 'react'

const SecondaryButton = ({ children, ...props }) => {
    return (
        <button  {...props} className={`
        transition-all duration-300 px-2 py-1 rounded-sm text-sm text-white  ${props.disabled ? "bg-gray-300" : "bg-gray-400 hover:bg-gray-500 active:bg-gray-300"}
        `} >{children}</button>
    )
}

export default SecondaryButton