import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GrHomeRounded } from 'react-icons/gr';
import { VscArrowSwap } from 'react-icons/vsc';
import { FaRegUser } from 'react-icons/fa';

const Navbar = () => {
  const [selected, setSelected] = useState('');

  // Load the initial state from localStorage
  useEffect(() => {
    const savedSelected = localStorage.getItem('selectedTab');
    if (savedSelected) {
      setSelected(savedSelected);
    }
  }, []);

  // Save the state to localStorage whenever it changes
  useEffect(() => {
    if (selected) {
      localStorage.setItem('selectedTab', selected);
    }
  }, [selected]);

  return (
    <nav className='fixed bottom-0 z-[9999] w-full py-5 px-10 flex items-center justify-between shadow-2xl rounded-t-lg shadow-black bg-white'>
    <button onClick={() => setSelected('home')}>
      <Link href='/'>
        <GrHomeRounded className={`size-5 ${selected === 'home' ? 'text-blue-700 fill-blue-200' : ''}`} />
      </Link>
    </button>
    <button onClick={() => setSelected('transactions')}>
      <Link href='/transactions'>
        <VscArrowSwap className={`size-5 ${selected === 'transactions' ? 'text-blue-700 fill-blue-700' : ''}`} />
      </Link>
    </button>
    <button onClick={() => setSelected('profile')}>
      <Link href='/profile'>
        <FaRegUser className={`size-5 ${selected === 'profile' ? 'text-blue-700 fill-blue-700' : ''}`} />
      </Link>
    </button>
  </nav>
);
};

export default Navbar;
