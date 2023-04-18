import React, { useState } from 'react';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import Layout from '../../components/ui/Layout';
import InvestModal from '../../components/InvestModal';
export default function Invest() {
  const [bitcoinAmount, setBitcoinAmount] = useState(0);
  const [investmentOption, setInvestmentOption] = useState('monthly');
  const [investmentCurrency, setInvestmentCurrency] = useState('BTC');

  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

  const handleBitcoinAmountChange = (event) => {
    setBitcoinAmount(event.target.value);
  };

  const handleInvestmentOptionChange = (event) => {
    setInvestmentOption(event.target.value);
  };

  const handleInvestmentCurrencyChange = (event) => {
    setInvestmentCurrency(event.target.value);
  };

  const handleInvestmentSubmit = (event) => {
    event.preventDefault();
    // Handle investment submission here
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>Invest in Bitcoin | My Investment Platform</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-gray-200 rounded-full flex flex-shrink-0 justify-center items-center text-primaryYellow text-2xl font-mono">
                {investmentCurrency}
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Investment Payment Channel</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Choose your investment option and amount below.
                </p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Investment Option</label>
                  <div className="relative inline-block w-full text-gray-700">
                    <select
                      value={investmentOption}
                      onChange={handleInvestmentOptionChange}
                      className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Investment Currency</label>
                  <div className="relative inline-block w-full text-gray-700">
                    <select
                      value={investmentCurrency}
                      onChange={handleInvestmentCurrencyChange}
                      className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                    >
                      <option value="BTC">Bitcoin (BTC)</option>
                      <option value="ETH">Ethereum (ETH)</option>
                      <option value="USDT" disabled>Tether (USDT) (Not available)</option>
                      <option value="BNB" disabled>Binance Coin (Not available)</option>
                      <option value="USDC" disabled>US Dollar Coin (Not available)</option>
                      <option value="XRP" disabled>XRP (Not available)</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">{investmentCurrency} Amount</label>
                  <input
                    type="number"
                    step="0.0001"
                    placeholder="0"
                    value={bitcoinAmount}
                    onChange={handleBitcoinAmountChange}
                    className="w-full px-4 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  />
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <button
                    onClick={handleInvestmentSubmit}
                    className="bg-primaryYellow flex justify-center items-center w-full text-black px-4 py-3 rounded-lg focus:outline-none hover:bg-lightBlack hover:text-primaryYellow"
                  >
                    Invest Now
                  </button>
                </div>
              </div>
            </div>
            <InvestModal isOpen={showModal} onClose={handleCloseModal} />
          </div>
        </div>
      </div>
    </div>
  );
}

Invest.getLayout = function getLayout(Invest) {
    return <Layout>{Invest}</Layout>;
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if(session){
        return { 
            props: { session } 
        }
    } else {
        return {
            redirect: {
                destination: `/login`,
                permanent: false,
            },
        };
    }
}

  