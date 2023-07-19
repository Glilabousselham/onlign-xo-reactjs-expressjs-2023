import React from 'react'

const DangerButton = ({ children, ...props }) => {
    return (
        <button  {...props} className={`transition-all duration-300 px-2 py-1 rounded-sm text-sm text-white ${props.disabled ? "bg-red-200" : "bg-red-500 hover:bg-red-600 active:bg-red-400 "}`} >{children}</button>
    )
}

export default DangerButton