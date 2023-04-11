import React from 'react'
import Investors from '../components/ui/Investors';
import Banks from '../components/ui/Banks';
import Layout from '../components/ui/Layout'

export default function Home() {
  return (
    <div className='flex flex-col font-montserrat items-center justify-center'>
      <iframe className="w-full h-10 scroll-auto overscroll-visible" src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover=no">
      </iframe>

      <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between h-[670px] md:h-[500px] md:px-10 bg-[url('/images/home.jpg')] bg-cover bg-no-repeat text-white p-2">
        <div className='mt-6 mx-2 flex flex-col gap-2 backdrop-blur-lg p-2 rounded-md md:max-w-[60%]'>
          <h1 className='text-xl md:text-4xl font-bold'>Welcome to <span className="text-primaryYellow">Crypto-Gen</span></h1>
          <p className='text-xs md:text-base max-w-[70%]'>The fastest rising crypto startup for the new generation of investors. We take pride in making sure your investments are secure and yield the maximum
          returns at the expected maturity dates.
          </p>
          <button className='px-4 w-[50%] ml-[20%] py-2 bg-primaryYellow tracking-wider rounded-md hover:text-primaryYellow hover:bg-lightBlack'>Get Started</button>
        </div>
        <iframe src="https://widget.coinlib.io/widget?type=full_v2&theme=dark&cnt=6&pref_coin_id=1505&graph=yes" className='w-full h-[400px] rounded-md'>
        </iframe>
      </div>
        <Investors />
        <Banks />
    </div>
  )
}

Home.getLayout = function getLayout(Home) {
  return <Layout>{Home}</Layout>;
}
