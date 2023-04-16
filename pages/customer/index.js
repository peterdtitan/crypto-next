import React from 'react'
import { signIn, getSession } from "next-auth/react";
import ProfileComponent from '../../components/customers/ProfileComponent';
import Layout from '../../components/ui/Layout'

export default function Customer({user}) {
  return (
    <ProfileComponent user={user}/>
  )
}

Customer.getLayout = function getLayout(Customer) {
  return <Layout>{Customer}</Layout>;
};


export async function getServerSideProps(context) {
  const session = await getSession(context);
  if(session){
    const res = await fetch(`https://us-central1-crypto-gen.cloudfunctions.net/app/api/user/userDetails/${session.user.id}`)
    const data = await res.json()
    const user = data;

    return { 
      props: { user } 
    }
  } else {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }
}
