import React from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import Head from 'next/head';
import { BsChevronUp } from 'react-icons/bs'
import Layout from '../components/ui/Layout'

const faqs = [
    {
      id: 1,
      question: 'What is your investment company all about?',
      answer:
        'Our investment company is focused on providing innovative investment solutions to help our clients grow their wealth and achieve their financial goals.',
    },
    {
      id: 2,
      question: 'What types of investment products do you offer?',
      answer:
        'We offer a wide range of investment products but primarily facilitated by crypto. From your crypto wallets there are lots of diversification options available and these include stocks, bonds, mutual funds, exchange-traded funds (ETFs), real estate investment trusts (REITs), and more.',
    },
    {
      id: 3,
      question: 'What is your investment philosophy?',
      answer:
        'Our investment philosophy is based on a disciplined, long-term approach that is grounded in fundamental analysis and risk management. We believe that by investing in high-quality companies with strong growth prospects, we can generate attractive returns for our clients over the long term.',
    },
    {
      id: 4,
      question: 'How do I open an investment account?',
      answer:
        'To open an investment account with our company, simply create and follow the instructions for setting up an account. You will need to provide some basic personal and financial information, and you may be required to submit additional documentation to verify your identity.',
    },
    {
        id: 5,
        question: "Can I set up automatic investments?",
        answer: "Yes, you can set up automatic investments on a monthly, quarterly, or annual basis.",
    },
    {
        id: 6,
        question: "Is my investment insured?",
        answer: "While investments are not insured by the Federal Deposit Insurance Corporation (FDIC), we take the security of your investment very seriously and use industry-standard security measures to protect your account.",
    },
    {
      id: 7,
      question: "Do you offer any tax benefits?",
      answer: "We do not offer any tax benefits ourselves, but investing in certain types of retirement accounts, such as IRAs, may provide tax benefits. Please consult a tax professional for more information.",
    },
    {
        id: 8,
        question: "What is the minimum amount required to start investing with your company?",
        answer: "Our minimum investment amount is $100.",
    },
    {
      id: 9,
      question: "What is the maximum amount I can invest?",
      answer: "There is no maximum investment amount. You can invest as much as you want. However there are tiers and each tier has it's unique benefit. View the 'Offers Page' to get started.",
    },
    {
      id: 10,
      question: 'What are your fees for managing my investments?',
      answer:
        'Our fees vary depending on the type of investment product and the amount of assets under management. Please contact us directly for more information about our fees.',
    },
    {
      id: 11,
      question: 'Do you offer any investment advice or financial planning services?',
      answer:
        'Yes, we offer a range of investment advice and financial planning services to help our clients achieve their financial goals. Our team of experienced professionals can provide personalized guidance and advice to help you make informed investment decisions.',
    },
    {
      id: 12,
      question: 'What is your track record for investment performance?',
      answer:
        'Our investment performance varies depending on market conditions and other factors, but we strive to deliver attractive risk-adjusted returns for our clients over the long term. Please browse the site or contact us directly for more information about our investment performance.',
    },
    {
      id: 13,
      question: 'What is your process for selecting investments?',
      answer:
        'We use a rigorous process for selecting investments that involves in-depth research and analysis of each potential investment opportunity. We focus on identifying high-quality companies with strong fundamentals and attractive growth prospects, and we use a disciplined approach to managing risk in our investment portfolios.',
    },
    {
      id: 14,
      question: 'How often do you rebalance your investment portfolios?',
      answer:
        'We rebalance our investment portfolios on a regular basis to ensure that they remain aligned with our clients investment objectives and risk tolerances. The frequency of rebalancing depends on a variety of factors, including market conditions, changes in our clients financial circumstances, and changes in our investment outlook.',
    },
    {
      id: 15,
      question: 'What sets your investment company apart from others?',
      answer:
        'There are several factors that set our investment company apart from others, including our disciplined investment approach, our experienced team of investment professionals, and our commitment to delivering superior investment performance and personalized service to our clients. We also offer a wide range of investment products and services to meet the diverse needs of our clients.',
    },
  ];
  

const Faq = () => {
  return (
    <div className="bg-gray-100 pb-8 md:pb-20">
    <Head>
    <title>FAQ</title>
    <meta name="description" content="FAQ Page" />
  </Head>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="sm:max-w-lg mx-auto pb-8">
          <div className="flex flex-col gap-4 pb-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center mt-8 md:mt-8">Frequently Asked Questions</h1>
            <p className="text-sm">
                Here are some of the questions received often. We have collated them and put them into one comprehensive FAQ guide for
                your interest. Please read the FAQ before opening a request form on the Help & Feedback page.
            </p>
          </div>
          <div className="space-y-8">
            {faqs.map((faq) => (
              <Disclosure key={faq.id}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-50">
                      <span>{faq.question}</span>
                      <BsChevronUp
                        className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-500`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">{faq.answer}</Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faq

Faq.getLayout = function getLayout(Faq) {
    return <Layout>{Faq}</Layout>;
}