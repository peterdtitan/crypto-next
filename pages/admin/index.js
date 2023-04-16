import React from 'react';
import Layout from '../../components/ui/Layout'
import { useSession, getSession } from 'next-auth/react';

export default function Admin({session}){
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold'>Welcome, 
                <span className='text-primaryYellow'> {session.user.firstName + ' ' + session.user.lastName}</span>
            </h1>
        </div>
    )
}

Admin.getLayout = function getLayout(Admin) {
    return <Layout>{Admin}</Layout>;
};

export async function getServerSideProps() {
    const session = await getSession();
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: true,
        },
      };
    }
    return {
      props: { session },
    };
}
