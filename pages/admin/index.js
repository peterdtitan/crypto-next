import React from 'react';
import Layout from '../../components/ui/Layout'
import { useSession } from 'next-auth/react';

export default function Admin(){
    const { data: session } = useSession();
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold'>Welcome, 
                <span className='text-primaryYellow'> {session.user.firstName + session.user.lastName}</span>
            </h1>
        </div>
    )
}

Admin.getLayout = function getLayout(Admin) {
    return <Layout>{Admin}</Layout>;
};