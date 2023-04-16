import React from 'react'
import { BiTimer, BiWorld, BiLineChart } from 'react-icons/bi'
import Layout from '../components/ui/Layout'

export default function Testimonials() {
  return (
    <div className='flex flex-col items-center gap-4 justify-center w-full h-full pt-10 pb-10 md:pb-20 bg-lightBlack font-montserrat text-white'>
      <div className="flex flex-col p-4 gap-4 items-center justify-center">
        <h1 className="text-2xl md:text-4xl ">Our Story in Numbers...</h1>
        <p className="font-montserrat text-xs md:text-base w-[70%] md:w-[70%]">
        Over the years, since our inception in 2019, we have many individual clients and provided B2B solutions as well. Our numbers tell
        the story of our success and we are proud to show it off.
        </p>

        <div className="flex flex-col md:flex-row gap-y-8 p-4 mt-8">

          <div className="flex flex-col items-center justify-center p-4 gap-8 h-[300px] md:h-[200px] w-[300px] md:w-[500px]">
            <h1 className="text-7xl text-slate-500 font-bold">700+</h1>
            <p className='w-[60%] text-sm'>
              Individual clients who actively have an investment portfolio with us. 
              Due to the the exclusivity of our platform, these clients have a gross collated income of over <span className="text-primaryYellow">$213.5M</span>
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 gap-8 h-[300px] md:h-[200px] w-[300px] md:w-[500px]">
            <h1 className="text-8xl text-slate-500 font-bold"><BiTimer /></h1>
            <p className='w-[60%] text-sm'>
              Ranked as in 2019, as having the top 100 ROI time and best trading output. We have the best minds in the game and
               have received this award in <span className="text-primaryYellow">Asia, USA and Europe (Germany, UK, Spain)</span>
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 gap-8 h-[300px] md:h-[200px] w-[300px] md:w-[500px]">
            <h1 className="text-7xl text-slate-500 w-">21+</h1>
            <p className='w-[60%] text-sm'>
              Number of businesses we have helped scale their global presence and expanded their portfolio via crypto investment. 
              These businesses have also <span className="text-primaryYellow">created partnerships with us </span> to offer their services and make the platform even better.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-y-10 p-4 mt-12">

          <div className="flex flex-col items-center justify-center p-4 gap-8 h-[300px] md:h-[200px] w-[300px] md:w-[500px]">
            <h1 className="text-8xl text-slate-500 font-bold"><BiWorld /></h1>
            <p className='w-[60%] text-sm'>
              Our client list is so diverse and spans across a number of countries in different continents. With this in mind, we have the most 
              <span className="text-primaryYellow"> diverse and friendly support team</span> to readily provide support to our clients.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 gap-8 h-[300px] md:h-[200px] w-[300px] md:w-[500px]">
            <h1 className="text-8xl text-slate-500 font-bold"><BiLineChart /></h1>
            <p className='w-[60%] text-sm'>
              Top 1000 most valued companies in the world. Ranked in Asia as the <span className="text-primaryYellow"> 209<sup>th</sup> fastest growing company </span> 
              of 2021 with over a 150% increase in growth index from the previous fiscal year.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-4 gap-8 h-[300px] md:h-[200px] w-[300px] md:w-[500px]">
            <h1 className="text-7xl text-slate-500 font-bold">700+</h1>
            <p className='w-[60%] text-sm'>
              Number of businesses we have helped scale their global presence and expanded their portfolio via crypto investment. 
              These businesses have also <span className="text-primaryYellow">created partnerships with us </span> to offer their services and make the platform even better.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

Testimonials.getLayout = function getLayout(Testimonials) {
  return <Layout>{Testimonials}</Layout>;
}