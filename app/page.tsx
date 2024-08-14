'use client'

import Navbar from "@/components/Navbar";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import CardFetchComponent from "@/components/CardFetch";
import Transactions from "./transactions/Transactions";
import Link from "next/link";
import PWAModal from "@/components/PWAModal";
import { useEffect, useState } from "react";
import { fetchBalance } from "./__api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CheckUserAuth } from "@/components/CheckUserAuth";


export default  function Home() {
  const router = useRouter()
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
  //get balance
  const transactions = useQuery({
    queryKey : ['balance'] ,
    queryFn : async () => await fetchBalance() ,
    retry:0
  })
  const {isLoading , error , data} = transactions

  const numBalance = Number(data?.balance)
  const formattedBalance = numBalance.toLocaleString()
  // check user status before showing home page

 
  return (
    <> 
    <CheckUserAuth>
    <MaxWidthWrapper>
      <div>{/* header */}
      <div className="flex items-center justify-between w-full flex-row-reverse top-0">
      <div><img alt="notification" src="/notification-bing.svg"/></div>
      <div className="flex gap-3">
        <img src="/user-1.png" alt="user" className="rounded-full size-12"/>
        <div> <span className="text-sm text-zinc-500">Hello User !</span>
        <h3 className="font-bold">Welcome back!</h3></div>
      </div>
    </div>
    {/* balance area */}
    <div className="py-5 mt-1">
      <div className="text-center text-2xl">Total Balance</div>
    <div className="text-center font-extrabold text-4xl mt-5">
      {isLoading ?  <div className="flex flex-col gap-3 items-center w-full justify-center mx-auto">
  <img src="/loader.svg" alt="loader" width={24} height={24} className="animate-spin" /></div>
       : error ? <><span>!</span></> 
       : data ? <>₺{formattedBalance}</> 
       : null}
      </div></div>
    <CardFetchComponent/>
    {/* transactions */}
    <div className='flex justify-between items-center mx-3 px-3 text-sm mt-10'>
            <h5 className='font-bold'>Recent Activity</h5>
            <Link href='/transactions'
            className='text-blue-600'
            >View all</Link>
        </div>
    <Transactions />
      </div>
       
      <PWAModal show={showInstallModal} onClose={handleCloseModal} onInstall={handleInstallClick}/>
    </MaxWidthWrapper>   
    <Navbar />
    </CheckUserAuth>
       </>
  
  );
}
