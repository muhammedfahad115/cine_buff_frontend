import React from 'react'
import './Spinner.css'
function Spinner({ width, height }) {
    return (
        <>
            <div className='flex items-center justify-center'>
                <div className={`spinner ${width} ${height}`}></div>
            </div>
        </>
    )
}

export default Spinner