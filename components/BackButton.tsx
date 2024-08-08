'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

const BackButton = () => {
  const router = useRouter();
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // Detect if the app is installed as a PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsPWA(isStandalone);
  }, []);

  // Function to go back to the previous page
  const goBack = () => {
    router.back();
  };

  // Render the back button only if it's a PWA
  if (!isPWA) return null;

  return (
    <Button variant='ghost' onClick={goBack}>
        <ArrowLeftIcon className='size-6'/>
    </Button>
  );
};

export default BackButton;
