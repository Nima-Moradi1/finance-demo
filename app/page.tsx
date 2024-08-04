'use client'

import Navbar from "@/components/Navbar";
import MaxWidthWrapper from "../components/CenterWidthWrapper";
import { IoNotificationsOutline } from "react-icons/io5";
import CardFetch from "@/components/CardFetch";
import CardFetchComponent from "@/components/CardFetch";
import Transactions from "./transactions/Transactions";
import Link from "next/link";


export default  function Home() {
  //getting card details api
  
  return (
    <>
        {/* header */}
    <div className="flex items-center mt-5 justify-between w-full flex-row-reverse top-0">
      <div><IoNotificationsOutline className="size-7"/></div>
      <div className="flex gap-3">
        <img src="/user-1.png" alt="user" className="rounded-full size-12"/>
        <div> <span className="text-sm text-zinc-500">Hello User !</span>
        <p>Welcome back!</p></div>
      </div>
    </div>
    {/* balance area */}
    <div className="py-5 mt-4">
      <p className="text-center text-xl">Total Balance</p>
    <p className="text-center font-extrabold text-4xl mt-5">$0</p></div>
    <CardFetchComponent/>
    {/* transactions */}
    <div className='flex justify-between items-center mx-3 px-3 text-sm mt-10'>
            <p className='font-bold'>Recent Activity</p>
            <Link href='/transactions'
            className='text-blue-600'
            >View all</Link>
        </div>
    <Transactions />
       </>
  );
}
