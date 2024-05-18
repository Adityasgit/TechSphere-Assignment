import React from 'react'

const Blueprint: React.FC<{ content1: JSX.Element, content2: JSX.Element, content3: JSX.Element, style: string }> = ({ content1, content2, content3, style }) => {
    return (
        <div className={`w-screen h-screen text-white flex flex-col md:flex-row ${style}`}>
            <div className='md:w-[20%]'>{content1}</div>
            <div className='md:w-[30%] hidden md:block'>{content2}</div>
            <div className='md:w-[50%]'>{content3}</div>
        </div>
    )
}

export default Blueprint
