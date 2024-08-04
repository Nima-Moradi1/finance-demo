'use client'

import CenterWidthWrapper from '@/components/CenterWidthWrapper'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
    <CenterWidthWrapper>
        <div className='flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10'>
            <img alt='user' src='/user-1.png' className='rounded-3xl'/>
        <p className='text-xl'>User Profile Page</p>
        </div>
    </CenterWidthWrapper>
    <Navbar />
    </>
    
  )
}

export default page