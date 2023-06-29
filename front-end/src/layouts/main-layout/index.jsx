import React from 'react'

// classes

const sm_classes = `
    sm:max-w-[400px] sm:mx-auto sm:max-h-[1000px]
`
const normal_classes = `
    w-screen h-screen bg-gray-200 text-gray-600 select-none relative
`

const MainLayout = ({ children }) => {
    return (
        <div className={`
        ${normal_classes} 
        ${sm_classes}
        `}>
            {children}
        </div>
    )
}

export default MainLayout