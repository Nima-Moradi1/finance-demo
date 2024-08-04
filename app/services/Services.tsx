'use client'

import React, { useCallback } from 'react'



const Services = () => {

    const handleOpenCamera = useCallback(() => {
        if(navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({
                video: {
                  facingMode: 'user',
                  width: { min: 640 },
                  height: { min: 480 },
                },
              })
                .then(stream => {
                  // You can use the stream to display the camera feed
                  // For example, you can create a video element and set its srcObject to the stream
                  const video = document.createElement('video');
                  video.srcObject = stream;
                  video.play();
                  // Add the video element to your page
                  document.body.appendChild(video);
                })
                .catch(error => {
                  if (error.name === 'NotAllowedError') {
                    console.error('User denied access to camera');
                  } else if (error.name === 'NotFoundError') {
                    console.error('No camera found');
                  } else {
                    console.error('Error opening camera:', error);
                  }
                });
        }
        
      }, []);


  return (
    <div className='flex flex-col gap-6 mt-5'>
        <p className='font-bold text-center text-lg'>Choose one of the services</p>
        {/* box 1 */}
        <div onClick={handleOpenCamera} className='bg-black flex w-full justify-between  pl-5 py-5 rounded-3xl'>
            <div className='text-white'>
                <h2 className='font-bold text-xl px-1'>Desposit money</h2>
                <h4 className='text-xs text-neutral-400'>deposit money to your account easily</h4>
            </div>
            <div>
                <img alt='money' src='/blackmoney-t.png' className='-mb-5'/>
            </div>
        </div>
        {/* box 2 */}
        <div onClick={handleOpenCamera} className='bg-purple-600 relative flex w-full justify-between  pl-5 py-5 overflow-hidden rounded-3xl'>
            <div className='text-white'>
                <h2 className='font-bold text-xl px-1'>Desposit money <br/> and get card</h2>
                <h4 className='text-xs text-neutral-400'>deposit money to your account easily and get card</h4>
            </div>
            <div className='w-72 overflow-hidden '>
                <img alt='money' src='/blackmoney-t.png' className=' absolute w-44 z-50 '/>
                <img alt='whitecard' src='/whitecard.png' className='absolute w-60 -right-2 top-1'/>
            </div>
        </div>
        {/* box 3 */}
        <div className='bg-red-700 relative flex w-full justify-between  pl-5 pt-6 pb-8 overflow-hidden rounded-3xl'>
            <div className='text-white'>
                <h2 className='font-bold text-xl px-1 '>Buy Istanbul card</h2>
                <h4 className='text-xs text-neutral-400'>Get an Istanbul card and explore the city</h4>
            </div>
            <div className='w-44 overflow-hidden '>
                <img alt='money' src='/istanbul.png' className=' absolute w-60 -right-2 -top-1 '/>
            </div>
        </div> 
        {/* box 4*/}
        <div className='bg-blue-700 relative flex w-full justify-between  pl-5 pt-6 pb-8 overflow-hidden rounded-3xl'>            <div className='text-white'>
                <h2 className='font-bold text-xl px-1'>Buy a Sim card</h2>
                <h4 className='text-xs text-neutral-400'>Get a Sim card and speak with your friends everywhere</h4>
            </div>
            <div className='w-44 overflow-hidden'>
                <img alt='money' src='/simcard.png' className=' absolute w-40 -right-2 -top-8 '/>
            </div>
        </div>
    </div>
  )
}

export default Services