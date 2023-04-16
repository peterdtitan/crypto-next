import React from 'react'
import Head from 'next/head';
import { useState } from 'react';
import ContactModal from '../components/Modal'
import Link from 'next/link'
import Layout from '../components/ui/Layout'

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [showModal, setShowModal] = useState(false);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if(
        email != "" &&
        name != "" &&
        message != ""
      ){
      // Add code to submit form data
        console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
        setShowModal(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        return alert("Please fill in the form first!")
      }
    };

    function handleCloseModal() {
      setShowModal(false);
    }
  
    return (
      <div className="bg-gray-100 text-sm md:text-base">
      <Head>
        <title>Contact | Crypto-Gen</title>
        <link rel="icon" href="/logo.png" />
      </Head>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col gap-4 pb-8 text-sm md:text-base">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contact Us
              </h2>
              <p>
              Please fill out the form with a detailed enquiry and the team will reachout to you within 48hrs.
              However, be sure to checkout the 
                <Link href="/faq">
                  <span className="text-primaryYellow font-semibold"> FAQ </span>
                </Link>
              as this contains most of the questions we have received via our contact forms. If you are a customer,
              you can reach us via phone on your dedicated broker/agent.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-900 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-4"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-900 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-4"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-900 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-6"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-primaryYellow hover:bg-lightBlack hover:text-primaryYellow focus:outline-none"
                >
                  Send Message
                </button>
              </div>
            </form>
            <ContactModal isOpen={showModal} onClose={handleCloseModal} />
          </div>
        </div>
      </div>
  );
}

Contact.getLayout = function getLayout(Contact) {
  return <Layout>{Contact}</Layout>;
}