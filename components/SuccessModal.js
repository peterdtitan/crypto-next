import React from 'react'
import {BsFillCheckCircleFill} from 'react-icons/bs'

export default function SuccessModal({isOpen, onClose}) {
    const [showModal, setShowModal] = React.useState(isOpen);

    React.useEffect(() => {
        if (isOpen) {
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
              }, 6000);
        }
    });

  return (
    <div
      className={`${
        showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } fixed inset-0 z-1000 flex items-center justify-center transition-opacity duration-300 overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="bg-white rounded-lg shadow-xl transform transition-all mx-auto">
        <div className="px-4 py-4 h-[400px] md:h-[400px] w-[350px] md:w-[400px] flex flex-col items-center justify-center gap-4">
            <p className="text-lg font-bold mb-2">Success!</p>
            <BsFillCheckCircleFill className="text-green-500 text-6xl"/>
            <p className="text-gray-700 text-base">Your ticket has been opened.</p>
            <p className='text-gray-700 text-sm mt-2'>
                Once your deposit has been confirmed by the blockchain, this would reflect in your account earnings page,
                with a description of<span className='text-primaryYellow'> &apos;Deposit&apos; </span>
                and the amount you deposited. Please avoid opening a Help Ticket unless this does not happen within 48hrs.
            </p>
        </div>
      </div>
    </div>
  )
}
