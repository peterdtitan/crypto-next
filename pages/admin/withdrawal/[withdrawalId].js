import React, { useState } from 'react'
import Layout from '../../../components/ui/Layout';
import { db } from "../../../firebase.config";
import { useRouter } from 'next/router'
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useSession, getSession } from 'next-auth/react';
import { nanoid } from 'nanoid'

export default function WithdrawalId({ withdrawal, user }) {
  const [newWithdrawal, setNewWithdrawal] = useState({ amount: '', description: '', date: ''})
  const [withdrawals, setWithdrawals] = useState(withdrawal)
  const [status, setStatus] = useState("")
  const [desc, setDesc] = useState("")

  const router = useRouter()


  const handleChange = (event) => {
    setNewWithdrawal({ ...newWithdrawal, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !newWithdrawal.amount ||
      !newWithdrawal.description ||
      !newWithdrawal.date
    ) {
      alert('Fill in all fields!')
    } else {
      try {
        const userRef = doc(db, "users", user.id);
        const userDoc = await getDoc(userRef);
        const userWithdrawal = userDoc.data()?.withdrawal;
  
        if (userWithdrawal) {
          await updateDoc(userRef, {
            withdrawal: arrayUnion({
              ...newWithdrawal,
              status: 'Pending',
              id: nanoid()
            })
          });
        } else {
          await setDoc(userRef, { withdrawal: [{
            ...newWithdrawal,
            status: 'Pending',
            id: nanoid()
          }] }, { merge: true });
        }
  
        alert('Added withdrawal');
        setNewWithdrawal({ amount: '', description: '', date: '' });
        router.reload()
      } catch(error) {
        console.log(error);
      }
    }
  };

  const handleUpdateStatus = async (index) => {
    try {
      const userRef = doc(db, "users", user.id)
      const updatedWithdrawals = [...withdrawals];
      updatedWithdrawals[index].status = status ? status : updatedWithdrawals[index].status;
      updatedWithdrawals[index].description = desc ? desc : updatedWithdrawals[index].description;
      await updateDoc(userRef, { withdrawal: updatedWithdrawals });
      setWithdrawals(updatedWithdrawals);
      setStatus("");
      setDesc("");
      alert("Updated user info")
      router.reload()
    } catch (error) {
      console.log(error);
    }
  };
  

  if(withdrawals.length === 0){
    return (
      <div className='flex flex-col items-center justify-center gap-20 p-10'>
        <h1 className="mt-4 text-xl font-semibold">This user has no Withdrawals</h1>
        <p className="">Add a new withdrawal below for the user</p>
        <form onSubmit={handleSubmit} className="p-4 flex gap-2 bg-primaryYellow/70">
        <label className="flex gap-2">
          Amount:
          <input type="number" name="amount" value={newWithdrawal.amount} onChange={handleChange} />
        </label>
        <label className="flex gap-2">
          Description:
          <input type="text" name="description" value={newWithdrawal.description} onChange={handleChange} />
        </label>
        <label className="flex gap-2">
          Date:
          <input type="date" name="date" value={newWithdrawal.date} onChange={handleChange} />
        </label>
        <button type="submit" className="bg-lightBlack rounded-md p-2 text-primaryYellow">Add Withdrawal</button>
      </form>
      </div>
    )
  } else {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-20">
      <h1 className="mt-4 text-xl font-semibold">Withdrawals</h1>
      <p>Below is a list of withdrawals this user has made and you can add a new withdrawal.</p>
      <div className='grid grid-cols-auto gap-4'>
      {withdrawals.map((withdrawal, index) => (
        <div key={index} className="bg-slate-200 rounded-md p-2 flex flex-col gap-2 w-80">
          <p>Amount: ${withdrawal.amount}</p>
          <label>
            Status:
            <input
              className="p-2"
              value={withdrawal.status}
              onChange={(e) => {
                const updatedWithdrawals = [...withdrawals];
                updatedWithdrawals[index].status = e.target.value;
                setWithdrawals(updatedWithdrawals);
              }}
            />
          </label>
          <p>Date: {withdrawal.date}</p>
          <label>
            Description:
            <input
              className="p-2"
              value={withdrawal.description}
              onChange={(e) => {
                const updatedWithdrawals = [...withdrawals];
                updatedWithdrawals[index].description = e.target.value;
                setWithdrawals(updatedWithdrawals);
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
          <input type="number" name="amount" value={newWithdrawal.amount} onChange={handleChange} />
        </label>
        <label className="flex gap-2">
          Description:
          <input type="text" name="description" value={newWithdrawal.description} onChange={handleChange} />
        </label>
        <label className="flex gap-2">
          Date:
          <input type="date" name="date" value={newWithdrawal.date} onChange={handleChange} />
        </label>
        <button type="submit" className="bg-lightBlack rounded-md p-2 text-primaryYellow">Add Withdrawal</button>
      </form>
    </div>
  )
}}

WithdrawalId.getLayout = function getLayout(WithdrawalId) {
  return <Layout>{WithdrawalId}</Layout>;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { withdrawalId } = context.query;

  if (!session) { 
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const response = await fetch(`https://us-central1-crypto-gen.cloudfunctions.net/app/api/user/userDetails/${encodeURIComponent(withdrawalId)}`);
  const user = await response.json()
  const withdrawal = user.withdrawal || []
  return {
    props: {
      session,
      withdrawal,
      user
    },
  };
}
