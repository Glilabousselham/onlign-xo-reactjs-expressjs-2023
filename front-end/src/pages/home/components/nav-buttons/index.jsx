import React from 'react'
import { useRouteHook } from '../../../../hooks/useRouteHook'
import { useNavigate } from 'react-router-dom'

const items = [
    {
        name: 'onlign users',
        to: "/"
    },
    {
        name: 'requests',
        to: "/requests"
    },
]

const NavButtons = () => {

    const routeHook = useRouteHook()

    const navigate = useNavigate()

    return (
        <div className='bg-white flex  '>
            {items.map((item, i) => (
                <div key={i} className={`
                    w-full text-center py-2 transition-all duration-300
                    ${routeHook.isRoute(item.to) ? "bg-blue-500 text-white" : "cursor-pointer hover:bg-blue-300 hover:text-white"}
                `}
                    onClick={() => navigate(item.to)}>
                    {item.name}
                </div>
            ))}

        </div>
    )
}

export default NavButtons