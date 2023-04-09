import React from 'react'
import logo from "../../public/images/logo.png";
import Image from "next/image";
import { Input, Spacer } from "@nextui-org/react";
import Link from 'next/link';
import {RiFacebookBoxLine, RiTwitterLine, RiInstagramLine} from 'react-icons/ri'


export default function Footer() {
  return (
    <div className='flex flex-col w-full bg-lightBlack text-white font-montserrat pt-20 p-16 pb-8 gap-10 font-thin'>
        <div className='grid grid-cols-2 gap-6 md:flex-row md:flex justify-between items-start'>
            <div className='w-[200px] h-[200px] md:hidden lg:flex col-span-2 relative -mt-16'>
                <Image src={logo} 
                alt="Afrocentric logo"
                layout='fill'
                objectFit='contain'
                />    
            </div>

            <div className="flex flex-col gap-2 cursor-pointer">
                <h2 className="text-base tracking-widest font-medium hover:text-primaryYellow">SITEMAP</h2>
                <div className="text-sm">
                    <ul>
                        <Link href="/" legacyBehavior><li className="hover:text-primaryYellow">Home</li></Link>
                        <Link href="/marketplace" legacyBehavior><li className="hover:text-primaryYellow">Explore</li></Link>
                        <Link href="/marketplace" legacyBehavior><li className="hover:text-primaryYellow">Marketplace</li></Link>
                        <Link href="#" legacyBehavior><li className="hover:text-primaryYellow">Community</li></Link>
                        <Link href="/blogs" legacyBehavior><li className="hover:text-primaryYellow">Blogs</li></Link>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col gap-2 cursor-pointer">
                <h2 className="text-base tracking-widest font-medium hover:text-primaryYellow">DISCOVER</h2>
                <div className="text-sm">
                    <ul>
                        <Link href="/" legacyBehavior><li className="hover:text-primaryYellow">Designers</li></Link>
                        <Link href="/marketplace" legacyBehavior><li className="hover:text-primaryYellow">Models</li></Link>
                        <Link href="/marketplace" legacyBehavior><li className="hover:text-primaryYellow">Craftsmen</li></Link>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col gap-2 cursor-pointer">
                <h2 className="text-base tracking-widest font-medium hover:text-primaryYellow">RESOURCES</h2>
                <div className="text-sm">
                    <ul>
                        <Link href="/" legacyBehavior><li className="hover:text-primaryYellow">Size Chart</li></Link>
                        <Link href="/marketplace" legacyBehavior><li className="hover:text-primaryYellow">Terms and Conditions</li></Link>
                        <Link href="/marketplace" legacyBehavior><li className="hover:text-primaryYellow">Return Policy</li></Link>
                        <Link href="#" legacyBehavior><li className="hover:text-primaryYellow">Privacy Policy</li></Link>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col gap-2 cursor-pointer">
                <h2 className="text-base tracking-widest font-medium hover:text-primaryYellow">CONNECT</h2>
                <Input 
                size="md" 
                placeholder="Medium" 
                aria-labelledby="Subscribe-button"
               />
               
               <div className="flex items-center justify-start gap-6">
                    <Link href="https://www.facebook.com/AFKulture" legacyBehavior>
                        <a rel="noopener noreferrer" target="_blank"><RiFacebookBoxLine size={25}/></a>
                    </Link>
                    <Link href="https://www.instagram.com/afrocentrickulture" legacyBehavior>
                        <a rel="noopener noreferrer" target="_blank"><RiInstagramLine size={25} /></a>
                    </Link>
                    <Link href="https://twitter.com/afrocentrickul1"  legacyBehavior>
                        <a rel="noopener noreferrer" target="_blank"><RiTwitterLine size={25} /></a>
                    </Link>
               </div>
            </div>
        </div>

        <div className="text-sm font-thin hidden md:flex md:flex-col gap-4">
            <p>Welcome to Crypto-Gen, a team of diverse investment bankers who deal with cryptocurrency. We provide you with a safe means of diversifying your portfolio and earning passive income whilst doing so. We have been existing as a licensed LLC for over 3 years
            serving over 600 customers, active and past, so be sure your investment is secure with us and sure to yield returns.
            </p>
            <p>Warm Regards,</p>
            <p>The Crypto-Gen Team</p>
        </div>

        <div className="flex items-center text-xs justify-center">
            <p>© Copyright 2023, CGT</p>
        </div>
    </div>
  )
}
