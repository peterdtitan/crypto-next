import React from 'react'
import Link from 'next/link';

const users = [
    {
        id: 1,
        name: 'Elon Musk',
        role: 'CEO, Tesla',
        image: '/images/elon.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, nec lacinia nisl nisl nec nisl.',
        url: 'https://twitter.com/elonmusk'
    },
    {
        id: 2,
        name: 'Vitalik Buterin',
        role: 'Founder, Ethereum',
        image: '/images/elon.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor, nisl vitae ultricies lacinia, nisl nisl aliquet nisl, nec lacinia nisl nisl nec nisl.',
        url: 'https://twitter.com/VitalikButerin'
    },
    {
        id: 3,
        name: 'Anthony Pompliano',
        role: 'Founder, Morgan Creek Digital',
        image: '/images/elon.jpg',
        description: 'Anthony Pompliano has 1.6 million followers on Twitter, where every day he shares crypto news to inform his audience. "Pomp," as he calls himself, sends a daily newsletter filled with insights on finance and tech to hundreds of thousands of investors. He has since recommended us a couple times.',
        url: 'https://twitter.com/satoshi'
    }
]

const Card = ({user}) => {
    return (
        <div className='flex flex-col items-center justify-start py-2 px-1 w-80 h-[350px] rounded-md bg-primaryYellow text-black font-montserrat gap-y-2'>
            <img src={user.image} alt="elon" className="w-20 h-20 rounded-full mt-8" />
            <p className='text-md text-center font-normal'>{user.name}</p>
            <p className='text-xs text-center bg-black text-white p-[5px] rounded-xl'>{user.role}</p>
            <p className='text-xs text-center italic'>{user.description}</p>
        </div>
    )
}

export default function Investors() {
  return (
    <div className='flex flex-col md:flex-row bg-black/90 text-white w-full items-center justify-center font-montserrat'>
        <div className="flex flex-col p-4 items-center justify-center">
            <h1 className='text-3xl font-semibold tracking-wider'>Top Investors</h1>
            <p className='text-sm md:w-[850px] text-center mt-4'>Our reserves are trsuted by some big names in the game and this makes it possible to continually provide the
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
