import React from 'react';
import Layout from '../../components/ui/Layout'
import { useSession, getSession } from 'next-auth/react';

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'admin',
    lastLogin: '2022-04-16 15:30:00',
    phoneNumber: '+1 (123) 456-7890',
    address: '123 Main St, Anytown USA'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    role: 'user',
    lastLogin: '2022-04-15 12:45:00',
    phoneNumber: '+1 (123) 456-7890',
    address: '456 Elm St, Anytown USA'
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    role: 'user',
    lastLogin: '2022-04-15 12:45:00',
    phoneNumber: '+1 (123) 456-7890',
    address: '456 Elm St, Anytown USA'
  },
  {
    id: 4,
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    role: 'user',
    lastLogin: '2022-04-15 12:45:00',
    phoneNumber: '+1 (123) 456-7890',
    address: '456 Elm St, Anytown USA'
  },
]


export default function Admin({session){

  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = (user) => {
    // Update user details in database
    setEditingUser(null);
  };

  return (
    <div className="flex flex-col gap-2 p-8">
    <h1 className='text-3xl mt-8'>Welcome <span className='text-primaryYellow'>21 Spirit</span>21 Spirit</h1>
      {users.map((user) => (
        <div
          key={user.id}
          className="p-4 border rounded-lg mb-4"
          onClick={() => handleEdit(user)}
        >
          <div className="font-bold text-lg">{user.firstName} {user.lastName}</div>
          <div className="text-gray-500 text-sm">{user.email}</div>
          {editingUser && editingUser.id === user.id && (
            <div className="mt-4">
              <div className="mb-2">Edit User</div>
              <div className="flex flex-col sm:flex-row">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border p-2 rounded-md mb-2 sm:mb-0 sm:mr-2"
                  defaultValue={user.firstName}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border p-2 rounded-md mb-2 sm:mb-0 sm:mr-2"
                  defaultValue={user.lastName}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-2 rounded-md mb-2 sm:mb-0 sm:mr-2"
                  defaultValue={user.email}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleSave(user)}
                >
                  Save
                </button>
                <button >Cancel</button>
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
