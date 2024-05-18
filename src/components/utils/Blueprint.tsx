import React from 'react'

const Blueprint: React.FC<{ content1: JSX.Element, content2: JSX.Element, content3: JSX.Element, styles: string, color: any }> = ({ color, content1, content2, content3, styles }) => {
    return (
        <div style={color} className={`w-screen h-screen text-white flex flex-col md:flex-row ${styles}`}>
            <div className='md:w-[20%]'>{content1}</div>
            <div className='md:w-[30%] hidden md:block'>{content2}</div>
            <div className='md:w-[50%]'>{content3}</div>
        </div>
    )
}

export default Blueprint
