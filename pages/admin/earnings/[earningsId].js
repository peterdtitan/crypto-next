import React, { useState } from 'react'
import Layout from '../../../components/ui/Layout';
import { db } from "../../../firebase.config";
import { useRouter } from 'next/router'
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useSession, getSession } from 'next-auth/react';
import { nanoid } from 'nanoid'

export default function EarningsId({ earning, user }) {
  const [newEarning, setNewEarning] = useState({ amount: '', description: '', date: ''})
  const [earnings, setEarnings] = useState(earning)
  const [status, setStatus] = useState("")
  const [desc, setDesc] = useState("")

  const router = useRouter()


  const handleChange = (event) => {
    setNewEarning({ ...newEarning, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !newEarning.amount ||
      !newEarning.description ||
      !newEarning.date
    ) {
      alert('Fill in all fields!')
    } else {
      try {
        const userRef = doc(db, "users", user.id);
        const userDoc = await getDoc(userRef);
        const userEarnings = userDoc.data()?.earnings;
  
        if (userEarnings) {
          await updateDoc(userRef, {
            earnings: arrayUnion({
              ...newEarning,
              status: 'Pending',
              id: nanoid()
            })
          });
        } else {
          await setDoc(userRef, { earnings: [{
            ...newEarning,
            status: 'Pending',
            id: nanoid()
          }] }, { merge: true });
        }
  
        alert('Added Earning Successfully');
        router.reload()
      } catch(error) {
        console.log(error);
      }
    }
  };

  const handleUpdateStatus = async (index) => {
    try {
      const userRef = doc(db, "users", user.id)
      const updatedearnings = [...earnings];
      updatedearnings[index].description = desc ? desc : updatedearnings[index].description;
      await updateDoc(userRef, { earnings: updatedearnings });
      setEarnings(updatedearnings);
      setStatus("");
      setDesc("");
      alert("Updated user info")
      router.reload()
    } catch (error) {
      console.log(error);
    }
  };
  

  if(earnings.length === 0){
    return (
      <div className='flex flex-col items-center justify-center gap-20 p-10'>
        <h1 className="mt-4 text-xl font-semibold">This user has no earnings</h1>
        <p className="">Add a new earning below for the user</p>
        <form onSubmit={handleSubmit} className="p-4 flex gap-2 bg-primaryYellow/70">
        <label className="flex gap-2">
          Amount:
          <input type="number" name="amount" value={newEarning.amount} onChange={handleChange} />
        </label>
        <label className="flex gap-2">
          Description:
          <input type="text" name="description" value={newEarning.description} onChange={handleChange} />
        </label>
        <label className="flex gap-2">
          Date:
          <input type="date" name="date" value={newEarning.date} onChange={handleChange} />
        </label>
        <button type="submit" className="bg-lightBlack rounded-md p-2 text-primaryYellow">Add Earning</button>
      </form>
      </div>
    )
  } else {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-20">
      <h1 className="mt-4 text-xl font-semibold">Earnings</h1>
      <p>Below is a list of earning (money) this user has made and you can add a new amount.</p>
      <div className='grid grid-cols-auto gap-4'>
      {earnings.map((earning, index) => (
        <div key={index} className="bg-slate-200 rounded-md p-2 flex flex-col gap-2 w-80">
          <p>Amount: ${earning.amount}</p>
          <p>Date: {earning.date}</p>
          <label>
            Description:
            <input
              className="p-2"
              value={earning.description}
              onChange={(e) => {
                const updatedearnings = [...earnings];
                updatedearnings[index].description = e.target.value;
                setEarnings(updatedearnings);
              }}
              type="text"
            />
          </label>
          <button onClick={()=>handleUpdateStatus(index)} className='p-2 bg-primaryYellow text-black hover:bg-lightBlack hover:text-primaryYellow'>Update Status</button>
        </div>
      ))}      
      </div>
      <form onSubmit={handleSubmit} className="p-4 flex gap-2 bg-primaryYellow/70">
        <label className="flex gap-2">
          Amount:
          <input type="number" name="amount" value={newEarning.amount} onChange={handleChange} />
        </label>
        <label className="flex gap-2">
          Description:
          <input type="text" name="description" value={newEarning.description} onChange={handleChange} />
        </label>
        <label className="flex gap-2">
          Date:
          <input type="date" name="date" value={newEarning.date} onChange={handleChange} />
        </label>
        <button type="submit" className="bg-lightBlack rounded-md p-2 text-primaryYellow">Add Earning</button>
      </form>
    </div>
  )
}}

EarningsId.getLayout = function getLayout(EarningsId) {
  return <Layout>{EarningsId}</Layout>;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { earningsId } = context.query;

  if (!session) { 
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const response = await fetch(`https://us-central1-crypto-gen.cloudfunctions.net/app/api/user/userDetails/${encodeURIComponent(earningsId)}`);
  const user = await response.json()
  const earning = user.earnings || []
  return {
    props: {
      session,
      earning,
      user
    },
  };
}
