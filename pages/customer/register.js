import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import BasicInfo from '../../components/customers/BasicInfo';
import OtherInfo from '../../components/customers/OtherInfo';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineWarning } from 'react-icons/ai'
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { app, db, auth } from "../../firebase.config";
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import logo from '../../public/images/logo.png';
import { getSession, signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';




const Register = () => {
  const [page, setPage] = useState(0);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setErrorMessage] = useState(null);
  const [isAlert, setIsAlert] = useState(false);


  const notifyRequiredFields = () => {
    toast.warn('Fill in required fields!', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const notifySuccess = () => {
    toast.success('Account Created. Logging in...', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const notifyError = () => {
    toast.error('Error creating profile. Try Again', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const userWriteError = () => {
    toast.error('Error adding profile details!', {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const loginError = () => {
    toast.error('Automatic login failed. Redirecting...', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    profilePhoto: "",
    coverPhoto: "",
    password: "",
    verified: false,
    confirmPassword: "",
    currentPlan: "",
    address: "",
    country: "",
    city: "",
    state: "",
    phoneNumber: "",
    sex: "",
  });


  const PageDisplay = () => {
    if (page === 0) {
      return <BasicInfo formData={formData} isAlert={isAlert} setFormData={setFormData} />;
    } else {
      return <OtherInfo formData={formData} isAlert={isAlert} setFormData={setFormData} />;
    }
  };


  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();


  const submitHandler = async (form, e) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;

    if (formData.password === formData.confirmPassword 
      && formData.username !== "" 
      && formData.email !== ""
      && formData.firstName !== ""
      && formData.lastName !== ""
      && formData.password !== ""
      && formData.address !== ""
      ) {
      try {
        const user = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const uid = user.user.uid;

        try {
          const docRef = await setDoc(doc(db, "users", uid), {
            id: uid, ...formData, role: "customer"
          }).then(async () => {
            notifySuccess();
            const payload = { email, password };
            const result = await signIn("credentials", {
              redirect: false,
              email: payload.email,
              password: payload.password,
            }
            );
            if (result.error) {
              loginError();
              window.location.href = "/login";
            }
            else if (result.status === 200) {
              window.location.href = '/customer';
            }
          });
        } catch (e) {
          userWriteError();
        }
      } catch (error) {
        notifyError();
      }
    } else {
      notifyRequiredFields();
    }
  };
  return (
    
    <div className='font-montserrat flex flex-col gap-8 items-center justify-center mb-20'>
      <div className="flex items-center w-full justify-between bg-lightBlack px-6 py-4 text-white">
        <Image src={logo} alt="afrocentric-logo" width={100} height={45} />
        <div className="flex-col items-center px-2 md:flex md:flex-row md:gap-4">
          <h3 className="text-sm">Already have an account?</h3>
          <button className="text-s cursor-pointer rounded-md bg-primaryYellow p-1 text-black md:py-1 md:px-6">
            <Link href="/login">
              <p>Sign In</p>
            </Link>
          </button>
        </div>
      </div>

      <div className="h-2.5 w-[25%] rounded-full bg-midGrey">
        {page === 0 ? (
          <>
            <div className="h-2.5 w-[50%] rounded-full bg-yellow-500"></div>
            <div className="flex justify-between gap-2 text-[9px] md:text-xs">
              <p className="font-semibold ">Basic Info</p>
              <p className="text-gray-400">Other Info</p>
            </div>
          </>
        ) : (
          <>
            <div className="h-2.5 w-[100%] rounded-full bg-yellow-500"></div>
            <div className="flex justify-between gap-2 text-[9px] md:text-xs">
              <p className="text-gray-400 ">Basic Info</p>
              <p className="font-semibold">Other Info</p>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 flex w-screen flex-col gap-8 md:mt-20 md:items-center md:justify-center"> 
        {PageDisplay()}
      </div>

      {page === 0 ? (
        <>
          <button
            className="cursor-pointer rounded-lg bg-primaryYellow p-2 px-28"
            onClick={() => {
              setPage((currPage) => currPage + 1);
            }}
          >
            Continue
          </button>
        </>
      ) : (
        <>
          <form className="flex flex-col md:grid grid-cols-2 gap-x-8 md:w-[70%]  gap-y-6 md:gap-y-8 p-8 font-montserrat">
            <button className="p-2 px-20 rounded-lg bg-lightBlack/90 text-white cursor-pointer"
              disabled={page == 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              Previous
            </button>
            <button
              type="submit"
              onClick={handleSubmit(submitHandler)}
              className="p-2 px-20 rounded-lg bg-primaryYellow cursor-pointer"
            >Submit
            </button>
          </form>
        </>)}
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />  
    </div>
  )
}


export default Register;



export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: `/${session.user.role}`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
