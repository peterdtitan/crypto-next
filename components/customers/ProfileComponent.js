import React, { useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import Image from "next/image";
import {MdEdit} from "react-icons/md";
import {BiError} from "react-icons/bi";
import { GoVerified } from 'react-icons/go'

const ProfileComponent = ({user}) => {


  const [showUserDetails, setShowUserDetails] = useState(true);
  const [showAccount, setShowAccount] = useState(false);

  const buttonClasses = " cursor-pointer py-1";
  const activeButton = "border-b-[4px] border-b-primaryYellow py-2 cursor-pointer";

  return (
    <main className="font-montserrat mt-0 flex flex-col">
      <section className="flex flex-col pb-10">
        <div className="relative h-[150px] md:h-[180px] lg:h-[200px] w-full flex">
          <Image
          src={user.coverPhoto ? user.coverPhoto : '/images/cover.png'}
          layout="fill"
          alt="cover photo"
          quality={100}
          priority
          className="opacity-80 object-cover"
          />
        </div>

        <div className="flex flex-col md:ml-10">
          <div className="max-w-md mx-[10px] -mt-10 bg-white overflow-hidden md:max-w-6xl">
            <div className="md:flex">
              <div className="md:flex-shrink-0 relative h-[120px] w-24 md:h-[200px] md:w-40 lg:h-[280px] lg:w-60 bg-white">
                <Image 
                src={user.profilePhoto ? user.profilePhoto : '/images/profilePhoto.png'}
                alt="profile image"
                quality={100}
                layout="fill"
                priority
                className="rounded-md object-cover border-2 border-primaryYellow"
                />
              </div>

              <div className="p-6 md:mt-8">
                <div className="uppercase tracking-wide md:text-2xl font-semibold">
                  {user.firstName} {user.lastName}
                </div>

                <div className="flex justify-between items-center border-b-[0.5px] border-slate-500">
                  <div className="flex gap-2 items-center pt-2 pb-4">
                    <MdOutlineLocationOn className="text-xl text-white bg-red-800 rounded-full p-1" />
                    {user.address}
                  </div>
                </div>
          
                <span className="text-xs pt-2 md:text-sm lg:text-base flex items-end">
                  <p>{user.bio}</p>
                </span>

                <div className="flex gap-4 items-start pt-4">
                  <p className="text-sm md:text-sm lg:text-base font-semibold tracking-wide">INTERESTS:</p>
                  <div className="flex gap-4 items-start">
                      { user.crypto.map((data) =>(
                        <small
                          key={data}
                          className="text-xs md:text-base flex items-center justify-center rounded-md py-1 px-2 bg-slate-300"
                        >
                          {data}
                        </small>
                      ))}
                  </div>
                </div>


                <div className="flex gap-x-6 md:gap-x-16 items-center justify-start mt-4">
                  <button className="flex p-2 rounded-lg border-[0.5px] gap-2 items-center border-lightBlack">
                    <MdEdit/>
                    <p className="text-xs md:text-sm lg:text-base">Edit <span className="hidden md:inline-block">Profile</span></p>
                  </button>
                  <button className="p-2 text-xs md:text-base rounded-lg bg-primaryYellow">
                    Upgrade <span className="hidden md:inline-block">Investment Plan</span>
                  </button>
                  <button disabled className="rounded-lg border-[0.5px] text-xs md:text-base cursor-not-allowed py-2 px-6 border-lightBlack">
                    Refer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-[0.5px] border-slate-300 items-center justify-center ">
        <div className="flex text-xs md:text-sm lg:text-base justify-evenly items-center max-w-6xl mx-auto">
          <button className={showUserDetails ? activeButton : buttonClasses}
          onClick={() => {
            setShowUserDetails(true);
            setShowAccount(false);
          }}
          >User Info
          </button>

          <button className={showAccount ? activeButton : buttonClasses}
          onClick={() => {
            setShowUserDetails(false);
            setShowAccount(true);
          }}
          >Account Details
          </button>
        </div>
      </section>

      <section className="flex items-center justify-center pb-10">
          {showUserDetails && 
            <div className="flex flex-col p-6 mt-2 gap-y-4 text-xs md:text-sm lg:text-base border-[0.5px] w-[90%] border-slate-300 rounded-md">
              <div className="flex justify-between p-4 bg-slate-100 rounded-md">
                  <p className="font-semibold">Legal Fullname</p>
                  <p className="">{user.firstName} {user.lastName}</p>
              </div>
              <div className="flex justify-between p-4 bg-slate-100 rounded-md">
                <p className="font-semibold">Username</p>
                <p className="">@{user.username}</p>
              </div>
              <div className="flex justify-between p-4 bg-slate-100 rounded-md">
                <p className="font-semibold">Account Verification</p>
                <p className="">Verified <span><GoVerified size={25} className='bg-white rounded-full p-1 text-blue-600 inline-block' /></span></p>
              </div>
              <div className="flex justify-between p-4 bg-slate-100 rounded-md">
                <p className="font-semibold">Address</p>
                <p className="">{user.address}</p>
              </div>
              <div className="flex justify-between p-4 bg-slate-100 rounded-md">
                <p className="font-semibold">Country</p>
                <p className="">{user.country}</p>
              </div>
              <div className="flex justify-between p-4 bg-slate-100 rounded-md">
                <p className="font-semibold">Date Joined</p>
                <p className="">N/A</p>
              </div>
              <div className="flex justify-between p-4 bg-slate-100 rounded-md">
                <p className="font-semibold">Total Invested</p>
                <p className="">N/A</p>
              </div>
              <div className="flex justify-between p-4 bg-slate-100 rounded-md">
                <p className="font-semibold">Withdrawal Limit</p>
                <p className="">${user.withdrawalLimit.amount} <span className="text-white italic bg-red-600 p-1 rounded-md font-bold">{user.withdrawalLimit.time}</span></p>
              </div>
            </div>
          }

          {showAccount && 
            <div className="flex flex-col p-6 mt-2 gap-y-4 text-xs md:text-sm lg:text-base border-[0.5px] w-[90%] border-slate-300 rounded-md">
              <div className="flex items-center gap-4">
                <BiError className="text-red-500" size={30}/>
                <p>Wallets not yet active. Check back soon.</p>
              </div>         
            </div>
          }
      </section>
    </main>
 );
};

export default ProfileComponent;