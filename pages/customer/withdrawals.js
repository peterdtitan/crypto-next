import React, { useEffect } from 'react'
import Layout from '../../components/ui/Layout'
import Head from 'next/head';
import { Disclosure } from '@headlessui/react';
import { BiError } from 'react-icons/bi'
import { BsChevronDown } from 'react-icons/bs'
import classNames from 'classnames';
import { useSession, getSession } from 'next-auth/react';


export default function Withdrawals(withdrawals) {
  const [initialRenderComplete, setInitialRenderComplete] = React.useState(false);

  useEffect(() => {
    setInitialRenderComplete(true);
  } , []);

  if(!initialRenderComplete) {
    return null
  } else {

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>My Withdrawals | Crypto-Gen</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">My Withdrawals</h1>

          {/* Withdrawals */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Withdrawal History</h2>
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            {!withdrawals.withdrawals.length == 0 ? (
              <ul className="divide-y divide-gray-200">
              {withdrawals.withdrawals.map((withdrawal) => (
                <li key={withdrawal.id}>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                          <div className="text-sm font-medium text-gray-900">{withdrawal.date}</div>
                          <div className="text-sm font-medium text-gray-900 p-2 rounded-full bg-green-100">${withdrawal.amount}</div>
                          <div
                            className={`text-xs font-medium p-2 w-20 flex justify-center rounded-full ${
                              withdrawal.status === 'Pending'
                                ? 'bg-yellow-300 text-yellow-800'
                                : withdrawal.status === 'Completed'
                                ? 'bg-green-300 text-green-800'
                                : 'bg-red-300 text-red-800'
                            }`}
                          >
                            {withdrawal.status}
                          </div>
                          <Disclosure.Button>
                            <BsChevronDown
                              className={classNames(
                                open ? '-rotate-180' : 'rotate-0',
                                'h-5 w-5 transform text-gray-400'
                              )}
                            />
                          </Disclosure.Button>
                        </div>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          <div className="flex items-center justify-between">
                            <div>Withdrawal ID:</div>
                            <div className="text-gray-900">{withdrawal.id}</div>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </li>
              ))}
            </ul>
            ) 
              : 
              <div className=" h-[300px] flex items-center justify-center gap-6 flex-col w-full">
                <BiError className="text-6xl text-red-700" />
                <p className="text-black text-lg italic">No earnings to display!</p>
              </div> 
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  }
                      }
         


Withdrawals.getLayout = function getLayout(Withdrawals) {
    return <Layout>{Withdrawals}</Layout>;
};


export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) { 
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const response = await fetch(`https://us-central1-crypto-gen.cloudfunctions.net/app/api/user/userDetails/${session.user.id}`)
  const user = await response.json()
  const withdrawals = user.withdrawal || []
  return {
    props: {
      session,
      withdrawals
    },
  };
}