import React, { useState } from 'react';
import Layout from '../../components/ui/Layout';
import { Input } from "@nextui-org/react";
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react';

export default function Admin({ users }) {
  const [editingUser, setEditingUser] = useState(null);
  const [showEditFields, setShowEditFields] = useState(false);
  const { data: session } = useSession();

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowEditFields(true);
  };

  const handleSave = (user) => {
    // Update user details in database
    setEditingUser(null);
    setShowEditFields(false);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setShowEditFields(false);
  };

  return (
    <div className="flex flex-col gap-2 p-8">
      <h1 className="text-4xl font-bold">
        Welcome,
        <span className="text-primaryYellow">
          {session ? session.user.firstName + ' ' + session.user.lastName : null}{' '}
        </span>
        to your Admin Dashboard
      </h1>
      <p className="mb-10">Edit all user info and save to make changes to their dashboard.</p>
      {users.map((user) => (
        <div
          key={user.id}
          className="p-4 border rounded-lg mb-4 hover:bg-slate-50"
          onClick={() => {
            if (editingUser?.id !== user.id) {
              setShowEditFields(false);
            }
            handleEdit(user);
          }}
        >
          <div className="font-bold text-lg">
            {user.firstName} {user.lastName}
          </div>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <p className="text-gray-500 text-sm">{user.currentPlan}</p>
          {showEditFields && editingUser && editingUser.id === user.id && (
            <div className="mt-4 flex flex-col  gap-8 items-center">
              <div className="mb-2 text-xl">Edit User Details</div>
              <div className="grid grid-cols-5 gap-2 w-full">
                {Object.entries(user).map(([key, value]) => {
                  if(typeof value !== 'string'){
                    return null
                  } else {
                    return (
                      <Input clearable label={key} placeholder={key} initialValue={value} />
                    );
                  }
                })}
              </div>
              <div className="flex justify-between items-center gap-2">
                <button
                  className="bg-primaryYellow hover:bg-lightBlack text-black hover:text-primaryYellow py-2 px-4 rounded"
                  onClick={() => handleSave(user)}
                >
                  Save
                </button>

                <Link href={`/admin/withdrawal/${user.id}`}>
                  <button
                    className="bg-primaryYellow hover:bg-lightBlack text-black hover:text-primaryYellow py-2 px-4 rounded"
                    onClick={() => handleSave(user)}
                  >
                    Add Withdrawal
                  </button>
                </Link>

                <Link href={`/admin/limit/${user.id}`}>
                  <button
                    className="bg-primaryYellow hover:bg-lightBlack text-black hover:text-primaryYellow py-2 px-4 rounded"
                    onClick={() => handleSave(user)}
                  >
                    Change Limit
                  </button>
                </Link>

                <Link href={`/admin/earnings/${user.id}`}>
                  <button
                  className="bg-primaryYellow hover:bg-lightBlack text-black hover:text-primaryYellow py-2 px-4 rounded"
                  onClick={() =>{

                  }}
                  >
                    Add Earnings
                  </button>
                </Link>

                <button
                  onClick={handleCancel}
                  className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
       

        </div>
      ))}
    </div>
    )
}

Admin.getLayout = function getLayout(Admin) {
    return <Layout>{Admin}</Layout>;
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

  const response = await fetch(`https://us-central1-crypto-gen.cloudfunctions.net/app/api/users`)
  const json = await response.json()
  const users = json || []

  return {
    props: { users },
  };
}
