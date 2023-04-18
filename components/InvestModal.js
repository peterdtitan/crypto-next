import { useState, useEffect } from 'react';
import Image from 'next/image'

export default function InvestModal({ isOpen, onClose, curr }) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      const timeout = setTimeout(() => {
        setShowModal(false);
        onClose();
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, onClose]);

  const currMap = [
    {
        name: 'Bitcoin',
        symbol: 'BTC',
        image: '/images/bitcoin.jpg'
    },
    {
        name: 'Ethereum',
        symbol: 'ETH',
        image: '/images/ethereum.jpg'
    },
    {
        name: 'Tether',
        symbol: 'USDT',
        image: '/images/tether.jpg'
    }
  ]

  return (
    <div
      className={`${
        showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md mx-auto">
        <div className="px-4 py-4 h-[500px] w-[350px] md:w-[500px] flex flex-col items-center gap-4">
          <p className="text-lg font-bold mb-2">Ticket Opened!</p>
          {currMap.map((data) => (
            <div key={data.symbol}>
                {data.symbol === curr && (
                    <div className=" relative flex flex-col items-center gap-4">
                        <Image 
                            src={data.image}
                            alt={data.name}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
