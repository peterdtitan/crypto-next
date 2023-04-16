import { useState, useEffect } from 'react';

export default function ContactModal({ isOpen, onClose }) {
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

  return (
    <div
      className={`${
        showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300`}
    >
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md mx-auto">
        <div className="px-4 py-4 h-[300px] w-[300px] flex flex-col gap-4">
          <p className="text-lg font-bold mb-2">Message Sent!</p>
          <p className="text-gray-700 text-base">We'll be in touch shortly.</p>
        </div>
      </div>
    </div>
  );
}
