'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdOutlineAddCard } from 'react-icons/md';




const Transactions = () => {

    const [transactions, setTransactions] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchTransactions = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch('http://demo.arcaneageis.com/api/get-transactions', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
  
          if (response.status === 200 || response.status === 201) {
            const data = await response.json();
            setTransactions(data);
            console.log(data)
          } else {
            setError('Failed to fetch card');
          }
        } catch (err : any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchTransactions();
    }, []);
  
    if (loading) return (
      <div className="flex flex-col bg-slate-100 py-10 my-5 gap-3 items-center w-full justify-center mx-auto">
    <img
        src="/loader.svg"
        alt="loader"
        width={24}
        height={24}
        className="animate-spin"
      />
    <p>Loading Transactions...</p>
  </div>
    )
    
  
  
    if (error) 
      return(
        <MaxWidthWrapper>
        <div className='flex flex-col gap-3 items-center justify-center w-full h-[30dvh]'>
            <p className='font-bold text-lg'>There are nothing</p>
            <p className='text-sm text-neutral-500'>Your recent transactions are shown here</p>
            <p className='text-4xl border-2 border-blue-600 rounded-full py-1 px-5 text-blue-600'>!</p>
        </div>
    </MaxWidthWrapper>
      );


  return (
    <div className='mt-10'>
        <div className='flex justify-between items-center mx-3 px-3 text-sm'>
            <p className='font-bold'>Recent Activity</p>
            <Link href='/transactions'
            className='text-blue-600'
            >View all</Link>
        </div>
    </div>
  )
}

export default Transactions