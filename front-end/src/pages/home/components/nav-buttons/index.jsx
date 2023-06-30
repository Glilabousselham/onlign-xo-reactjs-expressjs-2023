import React from 'react'
import { useRouteHook } from '../../../../hooks/useRouteHook'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



const NavButtons = () => {

    const routeHook = useRouteHook()

    const navigate = useNavigate()


    const items = [
        {
            name: 'onlign users',
            to: "/",
            count: useSelector(s => s.usersSlice).connectedUsers?.length ?? 0
        },
        {
            name: 'requests',
            to: "/requests",
            count: useSelector(s => s.requestsSlice).allRequests?.length ?? 0
        },
    ]
    return (
        <div className='bg-white flex  '>
            {items.map((item, i) => (
                <div key={i} className={`
                    w-full text-center py-2 transition-all duration-300
                    ${routeHook.isRoute(item.to) ? "bg-blue-500 text-white" : "cursor-pointer hover:bg-blue-300 hover:text-white"}
                `}
                    onClick={() => navigate(item.to)}>
                    {`${item.name} (${item.count})`}
                </div>
            ))}

        </div>
    )
}

export default NavButtons