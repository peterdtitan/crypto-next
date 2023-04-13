import React from 'react'
import Link from 'next/link'

export default function GettingStarted() {
  return (
    <div className='flex flex-col md:flex-row bg-black/90 text-white w-full items-center justify-center font-montserrat pb-10 md:pb-20'>
        <div className="flex flex-col p-4 items-center justify-center">
            <h1 className='text-3xl font-semibold tracking-wider mt-10'>Getting Started</h1>
            <p className='text-xs md:text-sm md:w-[850px] text-center mt-4'>
                The process of getting started has been broken down into easy steps to make it easier for you to dive right into a financially
                flexible lifestyle. With the steps below, you can quickly get started with investing. If you have an account the same steps apply,
                if not, then <Link href='/customer/register'><button className='bg-primaryYellow p-1 rounded-md text-black'>Get Started</button></Link>
            </p>
            <div className='flex flex-col md:grid md:grid-cols-3 gap-y-4 gap-x-6 mt-10 cursor-pointer'>
                <div className='flex md:items-start md:justify-start h-[150px] md:h-[250px] w-[300px] p-4 rounded-md border-[0.5px] border-slate-700'>
                    <div>  
                        <h1 className='flex items-center justify-center text-6xl md:text-7xl font-bold text-primaryYellow'>1.</h1>
                        <p className='text-xs md:text-base'>Create an account and fill out all the necerssary information needed to set you up. Our team can assist on account creation.</p>
                    </div>
                </div>
                <div className='flex md:items-center md:justify-center h-[150px] md:h-[250px] w-[300px] p-4 rounded-md border-[0.5px] border-slate-700'>
                    <div>  
                        <h1 className='flex items-center justify-center text-6xl md:text-7xl font-bold text-primaryYellow'>2.</h1>
                        <p className='text-xs md:text-base'>Choose an investment option and start your plan. Verify your ID to increase withdrawal limits and unlock plan options.</p>
                    </div>
                </div>
                <div className='flex md:items-end md:justify-center h-[150px] md:h-[250px] w-[300px] p-4 rounded-md border-[0.5px] border-slate-700'>
                    <div>  
                        <h1 className='flex items-center justify-center text-6xl md:text-7xl font-bold text-primaryYellow'>3.</h1>
                        <p className='text-xs md:text-base'>Log into your dashboard to monitor earnings, change plan, make withdrawals, or close account.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
