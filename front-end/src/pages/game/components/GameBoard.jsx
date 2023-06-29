import React from 'react'

const GameBoard = () => {
    return (
        <div className='grid grid-cols-3 h-full max-h-[400px] gap-1 p-1 rounded-sm mt-4 bg-white '>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(square => (
                // h-28
                <div key={square} className='w-full bg-gray-200 '></div>
            ))}
        </div>
    )
}

export default GameBoard