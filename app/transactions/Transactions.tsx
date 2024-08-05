'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link'
import React from 'react'
import { fetchTransactions, Transaction } from '../__api';
import { useQuery } from '@tanstack/react-query';




const Transactions = () => {

  //a function to format the date from the api 
  const formatDate = (isoDateString: string): string => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString();
  };

  const transactions = useQuery({
    queryKey : ['transactions'] ,
    queryFn : async () => await fetchTransactions() ,
    retry:0
  })
  const {isLoading , error , data} = transactions
  
    if (isLoading) return (
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
            <p className='text-3xl font-light border-2 border-blue-600 rounded-full py-2 px-5 text-blue-600'>!</p>
        </div>
    </MaxWidthWrapper>
      );
if(data) {
  return (
    <div className='mt-4 mb-20 md:mb-5 flex flex-col w-full items-center justify-center px-2 gap-5'>
    {data?.map((trx : Transaction)=> {
      return (
          <div key={trx.id}  className='bg-red-50 rounded-2xl p-5 px-8 w-full'>
       <div className='flex items-center justify-between w-full'>
         <div className='flex flex-col items-start justify-start gap-1'>
           <h2 className='font-bold text-base text-black'>
             {trx.description}
           </h2>
           <h4 className='text-sm text-zinc-500'>
             {formatDate(trx.transactionDate)}
           </h4>
         </div>
         <div>
           <p
           className={`${trx.amount >= 0 ? "text-green-600" : "text-red-600"} font-bold text-lg `}
           > {trx.amount >=0 ? <span>+</span> : null}
             ${trx.amount}</p>
         </div>
       </div>
     </div>
     
     )
    })}
 </div>
  )
}
}

export default Transactions