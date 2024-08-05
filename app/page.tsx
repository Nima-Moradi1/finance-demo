'use client'

import Navbar from "@/components/Navbar";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { IoNotificationsOutline } from "react-icons/io5";
import CardFetch from "@/components/CardFetch";
import CardFetchComponent from "@/components/CardFetch";
import Transactions from "./transactions/Transactions";
import Link from "next/link";
import PWAModal from "@/components/PWAModal";
import { useEffect, useState } from "react";


export default  function Home() {
  
    //states for pwa modal handling 
    const [showInstallModal,setShowInstallModal] = useState<boolean>(false)
    const [prompt,setPrompt] = useState<any>(null)
      // from here is the pwa modal functions
    const handleCloseModal = () => {
      setShowInstallModal(false)
    }
    // install click
    const handleInstallClick = () => {
      if(prompt){
        prompt.prompt()
    
        prompt.userChoice.then((choiceResult : any)=> {
          if(choiceResult.outcome === 'accepted') {
            console.log("Accepted Pwa installation by user")
          } else {
            console.log("rejected !")
          }
          setPrompt(null)
          setShowInstallModal(false)
        })
      }
    }
    
    useEffect(() => {
      const handleBeforeInstallPrompt = (event : any) => {
          event.preventDefault();
          setPrompt(event);
          
          const today = new Date().toLocaleDateString(); // Get today's date

          // Check if we have a stored date in localStorage
          const storedDate = localStorage.getItem('installPromptDate');

          // If there's no stored date or it's not today, show the modal
          if (!storedDate || storedDate !== today) {
              setShowInstallModal(true);
              localStorage.setItem('installPromptDate', today); // Store today's date
          }
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // Cleanup function
      return () => {
          window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
  }, []);
  
  return (
    <>
    <MaxWidthWrapper>
      <div>{/* header */}
      <div className="flex items-center justify-between w-full flex-row-reverse top-0">
      <div><img alt="notification" src="/notification-bing.svg"/></div>
      <div className="flex gap-3">
        <img src="/user-1.png" alt="user" className="rounded-full size-12"/>
        <div> <span className="text-sm text-zinc-500">Hello User !</span>
        <p className="font-bold">Welcome back!</p></div>
      </div>
    </div>
    {/* balance area */}
    <div className="py-5 mt-1">
      <p className="text-center text-2xl">Total Balance</p>
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
      </div>
       
      <PWAModal show={showInstallModal} onClose={handleCloseModal} onInstall={handleInstallClick}/>
    </MaxWidthWrapper>
       
    <Navbar />
       </>
  );
}
