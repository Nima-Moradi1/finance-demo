'use client'

import CenterWidthWrapper from '@/components/CenterWidthWrapper';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Navbar from '@/components/Navbar';
import React, { useCallback, useState } from 'react';
import { Html5Qrcode,Html5QrcodeScanner } from 'html5-qrcode';
import { useRouter } from 'next/navigation';

const Services = () => {
    const router = useRouter();
    const [url,setUrl] = useState('')

    const handleOpenCamera = useCallback(() => {
      function onScanSuccess(decodedText:any, decodedResult:any) {
        // handle the scanned code as you like, for example:
        setUrl(decodedText)
        // Extract the deviceid and hash from the URL
      const urlParams = new URLSearchParams(decodedText.split('?')[1]);
      const deviceid = urlParams.get('deviceid');
      const hash = urlParams.get('hash');
      if (deviceid && hash) {
        router.push(`/payment?deviceid=${deviceid}&hash=${hash}`);
      }
        
      }
      
      function onScanFailure(error:any) {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
        console.warn(`Code scan error = ${error}`);
      }
      
      let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: {width: 250, height: 250} },
        /* verbose= */ false);
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  }, [router]);


    return (
        <>
        <div id="reader" style={{ width: "100%", height: "100%" }}></div>
            <MaxWidthWrapper>
                <div className='flex flex-col gap-4 mb-20'>
                    <p className='font-bold text-center text-lg'>Choose one of the services</p>
                    {/* box 1 */}
                    <div onClick={handleOpenCamera} className='bg-black flex w-full justify-between pl-5 py-4 overflow-hidden rounded-3xl'>
                        <div className='text-white'>
                            <h2 className='font-bold text-xl px-1'>Desposit money</h2>
                            <h4 className='text-xs text-neutral-400'>deposit money to your account easily</h4>
                        </div>
                        <div>
                            <img alt='money' src='/blackmoney-t.png' className='-mb-5'/>
                        </div>
                    </div>
                    {/* box 2 */}
                    <div onClick={handleOpenCamera} className='bg-purple-600 relative flex w-full justify-between pl-5 pt-5 pb-3 md:py-8 overflow-hidden rounded-3xl'>
                        <div className='text-white'>
                            <h2 className='font-bold text-lg px-1'>Desposit money <br/> and get card</h2>
                            <h4 className='text-xs text-neutral-400 mr-1'>deposit money to your account easily and get card</h4>
                        </div>
                        <div className='w-72 overflow-hidden '>
                            <img alt='money' src='/blackmoney-t.png' className=' absolute w-44 z-50 right-0'/>
                            <img alt='whitecard' src='/whitecard.png' className='absolute w-60 -right-6 top-1'/>
                        </div>
                    </div>
                    {/* box 3 */}
                    <div className='bg-red-700 relative flex w-full justify-between pl-5 pt-6 md:min-h-[120px] pb-4 overflow-hidden rounded-3xl'>
                        <div className='text-white'>
                            <h2 className='font-bold text-xl px-1 '>Buy Istanbul card</h2>
                            <h4 className='text-xs text-neutral-400'>Get an Istanbul card and explore the city</h4>
                        </div>
                        <div className='w-44 overflow-hidden '>
                            <img alt='money' src='/istanbul.png' className=' absolute w-60 -right-2 -top-1 '/>
                        </div>
                    </div>
                    {/* box 4*/}
                    <div className='bg-blue-700 relative flex w-full justify-between pl-5 pt-6 pb-8 md:min-h-[120px] overflow-hidden rounded-3xl'>
                        <div className='text-white'>
                            <h2 className='font-bold text-xl px-1'>Buy a Sim card</h2>
                            <h4 className='text-xs text-neutral-400'>Get a Sim card and speak with your friends everywhere</h4>
                        </div>
                        <div className='w-44 overflow-hidden'>
                            <img alt='money' src='/simcard.png' className=' absolute w-40 -right-2 -top-8 '/>
                        </div>
                    </div>
                    <div>
                      <p>
                        {url? url : "couldn't fetch"}
                      </p>
                    </div>
                </div>
            </MaxWidthWrapper>
            <Navbar />
            
        </>
    );
};

export default Services;
