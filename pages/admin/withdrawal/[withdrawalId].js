import React, { useState } from 'react'
import Layout from '../../../components/ui/Layout';
import { db } from "../../../firebase.config";
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { useSession, getSession } from 'next-auth/react';

export default function WithdrawalId({ withdrawal, user }) {
  const [newWithdrawal, setNewWithdrawal] = useState({ amount: '', description: '', date: ''})
  const [withdrawals, setWithdrawals] = useState(withdrawal)

  const handleChange = (event) => {
    setNewWithdrawal({ ...newWithdrawal, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !newWithdrawal.amount ||
      !newWithdrawal.description ||
      !newWithdrawal.date
    )
    {
      alert('Fill in all fields!')
    } else {
      try{
        setUploading(true)
        const docRef = await setDoc(doc(db, "products", user.id), {
          ...newWithdrawal, status: 'Pending'
      }).then(async () => {
        alert('Added withdrawal')
        setNewWithdrawal({ amount: '', description: '', date: ''})
        // router.push("/designer/products")
        });
      } catch(error) {
        console.log(error)
      };

  }}

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-20">
      <h1 className="mt-4 text-xl font-semibold">Withdrawals</h1>
      <p>Below is a list of withdrawals this user has made and you can add a new withdrawal.</p>
      <div className='grid grid-cols-4 gap-4'>
        {withdrawals.map((withdrawal, index) => (
          <div key={index} className="bg-slate-200 rounded-md p-2 flex flex-col gap-2">
            <p>Amount: ${withdrawal.amount}</p>
            <p>Status: {withdrawal.status}</p>
            <p>Date: {withdrawal.date}</p>
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
}

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
