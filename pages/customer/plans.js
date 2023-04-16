import React, {useEffect} from 'react'
import Layout from '../../components/ui/Layout'
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import { BsChevronUp } from 'react-icons/bs'
import { PlusIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

const plans = [
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

export default function Plans({currentPlan}) {
  const [initialRenderComplete, setInitialRenderComplete] = React.useState(false);
  const index = plans.findIndex(obj => obj.name === currentPlan);
  const [plan, setPlan] = React.useState(plans[index]);

  useEffect(() => {
    setInitialRenderComplete(true);
  } , []);

  if(!initialRenderComplete) {
      return null
  } else {

  return (
    <div className="min-h-screen bg-gray-100 pb-10 md:pb-20">
      <Head>
        <title>My Plans | Crypto-Gen</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-gray-900">My Plans</h1>
            <p className="text-xs md:text-sm text-gray-700">
              Below are the available plans, and you can upgrade at any time. Choose a plan to contact your broker/agent and start an upgrade. 
              Please bear in mind that plan cancellations and upgrades are contigent on the terms of current contract.
              New plans will come into effect at the end of contractual tenure, or for an extra fee, within 72hrs from initiation.
            </p>
          </div>
          

          {/* Current plan */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">
              Current Plan: {plan.name}
            </h2>
            <div className="mt-2 text-sm text-gray-500 flex flex-col">
              {plan.features.map((data) => (
                <p>• {data}</p>
              ))}
            </div>
          </div>

          {/* Upgrade options */}
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={classNames(
                    'bg-white rounded-lg shadow-md overflow-hidden',
                    plan.name === currentPlan.name
                      ? 'border-indigo-500'
                      : 'border-gray-200'
                  )}
                >
                  <div className="px-6 py-8">
                    <h3 className="text-lg flex justify-center font-semibold text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="mt-4 text-2xl font-normal rounded-full bg-green-100 flex justify-center text-gray-900">
                      {plan.price}
                    </p>
                    <p className="text-xs mt-2 italic">
                      {plan.description}
                    </p>
                    <button
                      className={classNames(
                        'mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-black hover:text-primaryYellow bg-primaryYellow hover:bg-lightBlack focus:outline-none',
                        plan.name === currentPlan.name
                          ? 'bg-gray-300 cursor-default hover:bg-gray-300 focus:bg-gray-300'
                          : ''
                      )}
                      disabled={plan.name === currentPlan.name}
                    >
                      {plan.name === currentPlan.name ? 'Current Plan' : 'Upgrade'}
                    </button>
                  </div>
                  <Disclosure>
                    {({ open }) => (
                      <>
                      <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-50">
                      <span>What's included</span>
                      <BsChevronUp
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <ul>
                        {plan.features.map((feature) => (
                          <li key={feature} className="mt-2">
                            <PlusIcon className="inline-block w-5 h-5 text-gray-400" />
                            <span className="ml-2">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Disclosure.Panel>
                      </>
                    )
                  }
                  </Disclosure>
                </div>
              ))}
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}
              }
  



Plans.getLayout = function getLayout(Plans) {
    return <Layout>{Plans}</Layout>;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) { 
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }
  const response = await fetch(`https://us-central1-crypto-gen.cloudfunctions.net/app/api/user/userDetails/${session.user.id}`)
  const user = await response.json()
  const currentPlan = user.currentPlan || ""
  return {
    props: {
      session,
      currentPlan
    },
  };
}