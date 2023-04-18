import { useState, useEffect } from 'react';
import Image from 'next/image'
import { AiFillCloseCircle } from 'react-icons/ai'

export default function InvestModal({ isOpen, onClose, curr, setSuccess }) {
  const [showModal, setShowModal] = useState(isOpen);
  const [copy, setCopy] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    }
  });

  const copyContent = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      console.log('Content copied to clipboard');
      setCopy(true)
      const timeout = setTimeout(()=>{
          setCopy(false)
      }, 2000);
      return () => {
        clearTimeout(timeout)
      };
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }


  const currMap = [
    {
        name: 'Bitcoin',
        symbol: 'BTC',
        address: 'bc1qh6q86ta0hle2qeh2mx4h4ztt9sd6c4k0vn8mv0',
        image: '/images/bitcoin.jpg'
    },
    {
        name: 'Ethereum',
        symbol: 'ETH',
        address: '0x94971900b1593f37D7be1f6459337380544F30D6',
        image: '/images/ethereum.jpg'
    },
    {
        name: 'Tether',
        symbol: 'USDT',
        address: '0x1ad1bdc835fde211b5cd1a694af422b6c38d46cc',
        image: '/images/usdt.jpg'
    }
  ]

  const selectedCurrency = currMap.find((currency) => currency.symbol === curr);

  return (
    <div
      className={`${
        showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } fixed inset-0 z-1000 flex items-center justify-center transition-opacity duration-300 overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="bg-white rounded-lg shadow-xl transform transition-all mx-auto">
        <div className="px-4 py-4 h-[670px] md:h-[700px] w-[350px] md:w-[700px] flex flex-col items-center gap-4">
            <p className="text-lg font-bold mb-2">Ticket Opened!</p>
          {selectedCurrency && (
            <div className="flex flex-col items-center bg-black">
              <div>
              <img
                src={selectedCurrency.image}
                alt={selectedCurrency.name}
                className="w-[350px] md:w-[400px] h-[350px] md:h-[400px] rounded-md"
              />
              </div>
            </div>
          )}
          <div className="flex flex-col items-center gap-2">
            <button 
                onClick={() =>copyContent(selectedCurrency.address)}
                className={copy ? 'bg-green-500 text-green-900 p-2 cursor-pointer rounded-md md:w-[60%]': 'bg-primaryYellow md:w-[60%] rounded-md cursor-pointer p-2 text-black hover:bg-lightBlack hover:text-primaryYellow'}>
                {copy ? 'Copied!': 'Copy Wallet Address'}
            </button>
            <p className='text-black text-sm md:text-md text-center'>Send matching amount in <span className='text-primaryYellow font-semibold'>{selectedCurrency.name}</span> to the above wallet.</p>
            <p className='text-black text-sm italic'>
              <sup>**</sup>Please note that only deposits made in the 
              <span className='text-red-700 font-bold'> {selectedCurrency.name} wallet </span> 
              would reflect. Do not any deposit any other currencies to avoid permanent loss.
            </p>
          </div>
          <div className="flex items-center justify-between gap-4 -mt-2 md:-mt-0">
            <button 
                onClick={()=>{
                    setSuccess()
                    setShowModal(false)
                    onClose()
                }}
            className="bg-primaryYellow p-2 rounded-md text-sm md:text-md md:w-80">Confirm Sent</button>
            <button onClick={()=>{
                setShowModal(false)
                onClose()
            }} className="bg-red-600 p-2 rounded-md text-sm md:text-md text-white md:w-80">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
