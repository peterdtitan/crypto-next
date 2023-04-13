import React from 'react'

export default function Banks() {
  return (
    <div className='flex flex-col gap-4 bg-black/90 text-white w-full items-center justify-center font-montserrat px-10 pb-8 md:pb-20'>
        <h1 className='text-2xl md:text-4xl font-bold mt-8 md:mt-0'>Our Partners</h1>
        <p className='text-xs md:text-sm text-center max-w-[90%] md:max-w-[50%]'>We have partnered with the best banks in the world to ensure your funds are safe and secure. We also have a team of experts who are always available to help you with any issues you may have.</p>
        <div className='grid grid-cols-2 md:flex md:flex-row w-full md:max-w-[80%] gap-y-12 items-center justify-between mt-10'>
            <div className='flex flex-col gap-4 items-center justify-center'>
                <img src='/images/kfw.png' alt='bank' className='w-28 h-28 md:w-40 md:h-40' />
                <p className='text-xs md:text-base p-1 bg-slate-700 rounded-md text-white'>KFW IPEX-Bank</p>
            </div>
            <div className='flex flex-col gap-4 items-center justify-center'>
                <img src='/images/citi.jpg' alt='bank' className='w-28 h-28 md:w-40 md:h-40' />
                <p className='text-xs md:text-base p-1 bg-slate-700 rounded-md text-white'>Citibank</p>
            </div>
            <div className='flex flex-col gap-4 items-center justify-center'>
                <img src='/images/dbs.png' alt='bank' className='w-28 h-28 md:w-40 md:h-40' />
                <p className='text-xs md:text-base p-1 bg-slate-700 rounded-md text-white'>DBS</p>
             </div>
            <div className='flex flex-col gap-4 items-center justify-center'>
                <img src='/images/wells.png' alt='bank' className='w-28 h-28 md:w-40 md:h-40' />
                <p className='text-xs md:text-base p-1 bg-slate-700 rounded-md text-white'>Wells Fargo</p>
            </div>
        </div>
    </div>
  )
}
