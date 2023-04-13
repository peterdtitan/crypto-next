import React from 'react'
import Link from 'next/link';
import { GoVerified } from 'react-icons/go'

const users = [
    {
        id: 1,
        name: 'Elon Musk',
        role: 'CEO, Tesla',
        image: '/images/elon.jpg',
        description: 'Elon Musk, arguably the wealthiest man in the world, is the CEO of Tesla and was once a forerunner in Dogecoin before his exit. Since then, Elon has made a lot of backings for cryptocurrency both publicly and under the hood. He has also invested in many alternative coins and progressively planned a future where crypto is the preferred payment means.',
        url: 'https://twitter.com/elonmusk'
    },
    {
        id: 2,
        name: 'Anthony Pompliano',
        role: 'Angel Investor, Entreprenuer',
        image: '/images/anthony.jpg',
        description: 'Anthony Pompliano has invested over $100m in start-ups like us and has 1.6 million followers on Twitter, where every day he shares crypto news to inform his audience. "Pomp," as he calls himself, sends a daily newsletter filled with insights on finance and tech to hundreds of thousands of investors. He has since recommended us a couple times.',
        url: 'https://twitter.com/APompliano'
    },
    {
        id: 3,
        name: 'Vitalik Buterin',
        role: 'Co-Founder, Ethereum',
        image: '/images/vitalik.jpg',
        description: 'Vitaly Dmitrievich Buterin, better known as Vitalik Buterin, is a Russian-Canadian computer programmer, and founder of Ethereum. Buterin became involved with cryptocurrency early in its inception, co-founding Bitcoin Magazine in 2011. Since then, Vitalik has diversified and backed other platforms who are into making the world more crypto friendly.',
        url: 'https://twitter.com/VitalikButerin'
    },
]

const Card = ({user}) => {
    return (
        <div className='flex flex-col items-center justify-start p-2 w-80 h-[430px] md:h-[500px] rounded-md bg-primaryYellow text-black font-montserrat gap-y-2'>
            <div>
                <img src={user.image} alt="elon" className="w-32 h-32 rounded-full mt-2 object-cover border-[1.5px] border-black" />
                <GoVerified size={25} className='relative bottom-8 -right-24 bg-white rounded-full p-1 text-blue-600' />
            </div>
            <p className='text-md text-center font-medium -mt-3'>{user.name}</p>
            <p className='text-xs text-center bg-black text-white p-[5px] rounded-xl'>{user.role}</p>
            <p className='text-xs md:text-sm text-center italic'>{user.description}</p>
            <Link href={user.url} target="_blank">
              <button className='p-2 mt-2 text-xs border-[0.5px] border-white  text-white bg-black rounded-lg hover:text-primaryYellow'>
                View Profile
              </button>
            </Link>
        </div>
    )
}

export default function Investors() {
  return (
    <div className='flex flex-col md:flex-row bg-black/90 text-white w-full items-center justify-center font-montserrat pb-10 md:pb-16'>
        <div className="flex flex-col p-4 items-center justify-center">
            <h1 className='text-3xl font-semibold tracking-wider mt-10'>Top Investors</h1>
            <p className='text-xs md:text-sm md:w-[850px] text-center mt-4'>Our reserves are trusted by some big names in the game and this makes it possible to continually provide the
            best financial services to our loyal clients. With the help of our partner banks across the globe, our financial services are guaranteed to trustworthy. Our reserves are also available to view on request in a bid to keep up the transparency.
            </p>

            <div className='flex flex-col md:grid md:grid-cols-3 gap-y-4 gap-x-6 mt-10 cursor-pointer'>
                {users.map(user => (
                    <Card user={user} />
                ))}
            </div>
        </div>
    </div>
  )
}
