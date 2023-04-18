import React from 'react'
import Layout from '../../../components/ui/Layout';
import { useSession, getSession } from 'next-auth/react';

export default function LimitId() {
  return (
    <div>Limit Id details</div>
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
    const withdrawalLimit = user.withdrawalLimit || []
    return {
      props: {
        session,
        withdrawalLimit
      },
    };
  }