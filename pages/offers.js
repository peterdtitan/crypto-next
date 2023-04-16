import React from 'react'
import Head from 'next/head';
import Link from 'next/link'
import Layout from '../components/ui/Layout'

const offers = [
  {
    name: 'Standard',
    description: '** All benefits of this plan are stipulated in the contract on start/approval of investment plan and as such, can be viewd at any time on the contract page.',
    price: '$100-$1,999',
    features: ['Access to dashboard and monitoring earnings', 
    '24/7 email support', 'Basic ROI as stipulated on contract', 
    'Withdrawal minimum of $1,000', 'Withdrawal max of $1,000 monthly'],
    card: "w-80 rounded-xl flex flex-col items-center justify-center gap-4 border-[0.5px] border-black p-4 bg-white drop-shadow-lg hover:drop-shadow-2xl",
    desDesign: "bg-slate-300 p-2 rounded-md -mt-3 text-xs italic",
    ulDesign: "flex flex-col gap-2 bg-slate-300 p-2 rounded-md -mt-3 text-sm",
    priceDesign: "bg-slate-200 p-2 rounded-md -mt-3 text-sm",
    h1Design: "bg-primaryYellow p-2 rounded-md text-xl md:text-2xl"
  },
  {
    name: 'Premium',
    description: '** All benefits of this plan are stipulated in the contract on start/approval of investment plan and as such, can be viewd at any time on the contract page.',
    price: '$2,000-$4,999',
    features: ['Access to dashboard and monitoring earnings', 
    '24/7 email support', 'Basic ROI as stipulated on contract', 
    'Withdrawal minimum of $1,000', 'Withdrawal max of $3,000 monthly', '3-times split withdrawal'],
    card: "w-80 rounded-xl flex flex-col items-center justify-center gap-4 p-4 bg-slate-600 drop-shadow-lg hover:drop-shadow-2xl",
    desDesign: "bg-slate-300 p-2 rounded-md -mt-3 text-xs italic",
    ulDesign: "flex flex-col gap-2 bg-slate-300 p-2 rounded-md -mt-3 text-sm",
    priceDesign: "bg-slate-200 p-2 rounded-md -mt-3 text-sm",
    h1Design: "bg-primaryYellow p-2 rounded-md text-xl md:text-2xl"
  },
  {
    name: 'Gold',
    description: 'All benefits of this plan are stipulated in the contract on start/approval of investment plan and as such, can be viewd at any time on the contract page.',
    price: '$5,000 - $9,999',
    features: ['** All basic features of Premium Plan', 'Increased withdrawal limit ($7,000)', '5-times split withdrawal', 'Phone support', 'Upgraded dashboard layout'],
    card: "w-80 rounded-xl flex flex-col items-center justify-center gap-4 p-4 bg-primaryYellow text-white drop-shadow-lg hover:drop-shadow-2xl",
    desDesign: "bg-lightBlack p-2 rounded-md -mt-3 text-xs italic",
    ulDesign: "flex flex-col gap-2 bg-lightBlack p-2 rounded-md -mt-3 text-sm",
    priceDesign: "bg-lightBlack p-2 rounded-md -mt-3 text-sm",
    h1Design: "bg-lightBlack p-2 rounded-md text-xl md:text-2xl text-white"
  },
  {
    name: 'Platinum',
    description: '** All benefits of this plan are stipulated in the contract on start/approval of investment plan and as such, can be viewd at any time on the contract page.',
    price: '$10,000 - $49,999',
    features: ['All features of Gold ++', 'Flexbible ROI (incremental) based on gain caps', 'Flexible withdrawal without limit', 'Dedicated phone line', 'Priority service'],
    card: "w-80 rounded-xl flex flex-col items-center justify-center gap-4 border-[0.5px] border-black p-4 bg-lightBlack/90 drop-shadow-lg hover:drop-shadow-2xl",
    desDesign: "bg-slate-300 p-2 rounded-md -mt-3 text-xs italic",
    ulDesign: "flex flex-col gap-2 bg-slate-300 p-2 rounded-md -mt-3 text-sm",
    priceDesign: "bg-slate-200 p-2 rounded-md -mt-3 text-sm",
    h1Design: "bg-primaryYellow p-2 rounded-md text-xl md:text-2xl "
  },
  {
    name: 'Elite',
    description: '** All benefits of this plan are stipulated in the contract on start/approval of investment plan and as such, can be viewd at any time on the contract page.',
    price: '$49,999 - ∞',
    features: ['Features of all plans upgraded', 'Best ROI flexi++', 'Improved and detailed dashboard configuration', 'Highest priority service', 'Dedicated broker', 'Priority phone line'],
    card: "w-80 rounded-xl flex flex-col items-center justify-center gap-4 border-[0.5px] border-black p-4 bg-black text-white drop-shadow-lg hover:drop-shadow-2xl",
    desDesign: "bg-lightBlack p-2 rounded-md -mt-3 text-xs italic",
    ulDesign: "flex flex-col gap-2 bg-lightBlack p-2 rounded-md -mt-3 text-sm",
    priceDesign: "bg-lightBlack p-2 rounded-md -mt-3 text-sm",
    h1Design: "bg-primaryYellow p-2 rounded-md text-xl md:text-2xl text-black"
  },
]

const Card = ({offer}) => {
  return (
      <div className={`${offer.card} cursor-default`}>
        <h1 className={offer.h1Design}>{offer.name.toUpperCase()}</h1>
        <p className={offer.priceDesign}>{offer.price}</p>
        <ul className={offer.ulDesign}>
        {offer.features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
        </ul>
        <p className={offer.desDesign}>{offer.description}</p>
      </div>
  )
}

export default function Offers() {
  return (
    <div className='flex flex-col items-center gap-4 justify-center w-full h-full pt-10 pb-20 bg-slate-50 font-montserrat'>
    <Head>
      <title>Offers | Crypto-Gen</title>
      <link rel="icon" href="/logo.png" />
    </Head>
      <h1 className="text-2xl md:text-4xl">View our offers...</h1>
      <p className="font-montserrat text-xs md:text-base w-[80%] md:w-[70%text-xl md:]">
      With a very highly competitive market in the crypto industry, we offer the best possible options for investing and actualizing your returns
      quicker than any other crypto investment brokers in the market.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {offers.map((offer, index) => (
          <Card offer={offer} />
        ))}
      </div>

      <h2 className="text-2xl md:text-4xl mt-4 md:mt-12">Next Steps...</h2>
      <p className="font-montserrat text-xs md:text-base w-[80%] md:w-[70%text-xl md:]">
      To get started investing and exploring more options, get started by creating an account. Our team of experts will reach out to you via email within 48hrs
      to discuss your preferences and help you get setup. If you have any questions, be sure to checkout the
      <Link href='/faq'><span className='bg-primaryYellow p-1 rounded-md ml-1'>FAQ</span></Link> or 
      <Link href='/contact'><span className='bg-primaryYellow p-1 rounded-md ml-1'>Contact Us</span></Link>
      </p>
      <Link href='/customer/register'><button className='bg-primaryYellow p-2 text-sm md:text-base mt-1 rounded-md hover:bg-black hover:text-primaryYellow'>Get Started Now</button></Link>
    </div>
  )
}

Offers.getLayout = function getLayout(Offers) {
  return <Layout>{Offers}</Layout>;
}