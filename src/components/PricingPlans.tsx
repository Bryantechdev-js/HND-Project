"use client"


// pages/pricing.js
import React, { useState } from 'react';
import Head from 'next/head';
import { CheckIcon, CreditCardIcon, PhoneIcon } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = {
    weekly: {
      title: 'Weekly Plan',
      price: 5000,
      momo:"https://pay.lygosapp.com//link/8986c14a-947f-4ab8-9bc9-228a1e5f25ef",
      stripe:"https://buy.stripe.com/test_7sIeVe9bVa4NffydQT",
      features: [
        'Send up to 1,000 emails per day',
        'Basic analytics',
        'Standard support',
        'Single user access',
      ],
    },
    monthly: {
      title: 'Monthly Plan',
      price: 15000,
      momo:"https://pay.lygosapp.com//link/75a9cdcb-f497-4664-9163-aee1f4b49b68",
      stripe:"https://buy.stripe.com/test_4gwcN6bk3el32sM3cd",
      features: [
        'Send up to 5,000 emails per day',
        'Advanced analytics',
        'Priority support',
        'Team access (up to 3 users)',
        'API access',
      ],
    },
    yearly: {
      title: 'Yearly Plan',
      price: 150000, // Save ~$60 compared to monthly
      momo:"https://pay.lygosapp.com//link/f69bba4f-1f22-4178-9208-7e242d46498c",
      stripe:"https://buy.stripe.com/test_cN2aEY0Fp7WFd7q6oq",
      features: [
        'Unlimited emails',
        'Premium analytics dashboard',
        '24/7 priority support',
        'Unlimited team members',
        'Advanced API access',
        'Custom email templates',
        'Dedicated account manager',
      ],
    },
  };

  

 
  



   

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#121212] text-gray-100">
      <Head>
        <title>MaxMail - Pricing</title>
        <meta name="description" content="MaxMail pricing plans" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl  dark:text-white text-black   font-bold mb-4">
            Choose the Perfect Plan for Your Needs
          </h1>
          <p className="text-xl text-black dark:text-white">
            Flexible pricing options designed to scale with your business
          </p>
        </div>

        {/* Plan selection tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-gray-800 rounded-lg">
            <button
              onClick={() => setSelectedPlan('weekly')}
              className={`px-6 py-2.5 rounded-md transition-all duration-300 ${
                selectedPlan === 'weekly'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-6 py-2.5 rounded-md transition-all duration-300 ${
                selectedPlan === 'monthly'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`px-6 py-2.5 rounded-md transition-all duration-300 ${
                selectedPlan === 'yearly'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.keys(plans).map((planKey) => {
            const plan = plans[planKey];
            console.log(plan)
            const isActive = selectedPlan === planKey;

            return (
              <div
                key={planKey}
                className={`relative rounded-xl dark:bg-[#121212] overflow-hidden transition-all duration-300 transform ${
                  isActive ? 'scale-105 z-10' : 'scale-100 opacity-80'
                } hover:scale-105 group`}
              >
                {/* Animated border */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-xy opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Card content */}
                <div className="relative bg-white dark:bg-white shadow-md  m-0.5 h-full rounded-xl p-6 flex flex-col">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold dark:text-black text-black mb-2">{plan.title}</h3>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-extrabold  dark:text-black text-black">{plan.price} FCFA</span>
                      <span className="ml-2 text-white dark:text-black">
                        {planKey === 'weekly' ? '/week' : planKey === 'monthly' ? '/month' : '/year'}
                      </span>
                    </div>
                    {planKey === 'yearly' && (
                      <div className="mt-2 text-green-400 text-sm font-medium">
                        Save over 16% compared to monthly
                      </div>
                    )}
                  </div>

                  {/* Features list */}
                  <ul className="mb-8 flex-grow space-y-4">
                    {plan.features.map((feature, idx) => (
                      
                      
                      // PaymentsLinks.lk=idx===0?PaymentsLinks[0]:idx===1?PaymentsLinks[1]:PaymentsLinks[3]
                      <li 
                        key={idx} 
                        className="flex items-start dark:text-black text-black opacity-0 animate-fadeIn" 
                        style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
                      >
                        <CheckIcon className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  

                  {/* Payment options */}
                  <div className="space-y-4 mt-auto">
                    <Link href={`${plan.stripe}`}>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:translate-y-px">
                      <CreditCardIcon className="w-5 h-5 mr-2" />
                      <span>Subscribe with Stripe</span>
                    </button>
                    </Link>
                    
                    <Link href={`${plan.momo}`}>  
                    <button className="w-full border border-gray-600 hover:border-gray-400 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-200 transform hover:translate-y-px">
                      <PhoneIcon className="w-5 h-5 mr-2" />
                      
                      <span className='text-black'>Pay with Mobile Money</span>
                      
                    </button>
                    </Link>
                  </div>

                  {/* Payment methods icons */}
                  <div className="mt-6 pt-4 border-t border-gray-700 flex justify-center space-x-4">
                    <div className="text-xs text-black flex items-center">
                      <CreditCardIcon className="w-4 h-4 mr-1" />
                      Stripe
                    </div>
                    <div className="text-xs text-black flex items-center">
                      <PhoneIcon className="w-4 h-4 mr-1" />
                      Mobile Money
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="py-8 text-center text-black">
        <p>© 2025 MaxMail. All rights reserved.</p>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes gradient-xy {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-gradient-xy {
          background-size: 400% 400%;
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>
    </div>
  );
}