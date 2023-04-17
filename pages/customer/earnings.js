import React, {useEffect} from 'react'
import { useSession, getSession } from 'next-auth/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer  } from 'recharts'
import { BiError } from 'react-icons/bi'
import Layout from '../../components/ui/Layout'

export default function Earnings(earnings){

    const [initialRenderComplete, setInitialRenderComplete] = React.useState(false);
    const formatYAxis = (value) => `$${value}`;

    useEffect(() => {
      setInitialRenderComplete(true);
    } , []);

    if(!initialRenderComplete) {
        return null
    } else {
        
  return (
    <div className="min-h-screen bg-lightBlack text-white font-montserrat pb-8 md:pb-20">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 py-8">
          <h1 className="text-3xl font-bold">Earnings</h1>
          <p className='text-sm md:text-base'>
            This is a list of all your earnings. You can view your earnings by
            each transaction day, as well as a description for each transaction.
            With this, the need to have regular check-in calls is abstracted.
          </p>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-4 flex items-center justify-center">
        {!earnings.earnings.length == 0 ?
            <ResponsiveContainer width="100%" height={400}>
                <LineChart width={400} height={250} data={earnings.earnings}>
                  <Line type="monotone" dataKey="amount" stroke="#4F46E5" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatYAxis} fontSize={14}/>
                  <Tooltip formatter={(value) => `$${value}`} fontSize={14}/>
                </LineChart>
            </ResponsiveContainer>
        : 
        <div className="w-[300px] h-[300px] flex items-center justify-center gap-6 flex-col">
            <BiError className="text-6xl text-red-700" />
            <p className="text-black text-lg italic">No earnings to display!</p>
        </div> }
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!earnings.earnings.length == 0 ? earnings.earnings.map((earning) => (
            <div
              key={earning.date}
              className="bg-white text-md overflow-hidden shadow rounded-lg p-4 hover:bg-primaryYellow/80 text-black hover:text-white"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium bg-green-100 text-black rounded-full px-2">{earning.date}</h2>
                <span className="bg-green-100 text-green-800 font-semibold rounded-full px-2">
                  ${earning.amount}
                </span>
              </div>
              <p className="mt-2 text-sm italic">
                {earning.description}
              </p>
            </div>
          )): null }
        </div>
      </div>
    </div>
  )
}
}

Earnings.getLayout = function getLayout(Earnings) {
    return <Layout>{Earnings}</Layout>;
}

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
    const earnings = user.earnings || []
    return {
      props: {
        session,
        earnings
      },
    };
  }

