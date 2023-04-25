import React from 'react'
import Layout from '../../../components/ui/Layout';
import { useSession, getSession } from 'next-auth/react';

export default function EarningId({earnings}) {
  return (
    <div>earnings id.js</div>
  )
}

EarningId.getLayout = function getLayout(EarningId) {
  return <Layout>{EarningId}</Layout>;
};

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const { earningId } = context.query;
  
    if (!session) { 
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  
    const response = await fetch(`https://us-central1-crypto-gen.cloudfunctions.net/app/api/user/userDetails/${encodeURIComponent(earningId)}`);
    const user = await response.json()
    const earnings = user.earnings || []
    return {
      props: {
        session,
        earnings
      },
    };
  }