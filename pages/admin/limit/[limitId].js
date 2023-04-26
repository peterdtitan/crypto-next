import React, {useState} from 'react'
import { useRouter } from 'next/router' 
import { db } from "../../../firebase.config";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import Layout from '../../../components/ui/Layout';
import { useSession, getSession } from 'next-auth/react';

export default function LimitId({limit, user}) {

  const router = useRouter()

  const [withdrawalLimit, setWithdrawalLimit] = useState(limit)
  const [amount, setAmount] = useState(withdrawalLimit.amount)
  const [time, setTime] = useState(withdrawalLimit.time)

  const handleUpdateLimit = async () => {
    try {
      const userRef = doc(db, "users", user.id)
      await setDoc(userRef, { withdrawalLimit: [{
        amount,
        time,
      }] }, { merge: true });

      alert(`Withdrawal limit updated for user ${user.firstName}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-10">
      <h1 className="text-3xl">User Withdrawal Limit</h1>
      <div className="flex flex-col p-4 bg-slate-200 gap-4 rounded-md">
        <label>
          Amount
          <input className="ml-2 p-2" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label>
          Time
          <input className="ml-2 p-2" type="text" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
        <button onClick={handleUpdateLimit} className='p-2 rounded-md bg-primaryYellow text-black hover:bg-lightBlack hover:text-primaryYellow'>Update Limit</button>
      </div>
    </div>
  )
}

LimitId.getLayout = function getLayout(LimitId) {
  return <Layout>{LimitId}</Layout>;
};

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const { limitId } = context.query;
  
    if (!session) { 
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  
    const response = await fetch(`https://us-central1-crypto-gen.cloudfunctions.net/app/api/user/userDetails/${encodeURIComponent(limitId)}`);
    const user = await response.json()
    const limit = user.withdrawalLimit || {}
    return {
      props: {
        session,
        limit,
        user
      },
    };
  }