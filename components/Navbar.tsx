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
    <div className=' mx-auto w-full max-w-screen-md z-50'>
        <nav className='fixed bottom-0 max-w-screen-md w-full py-5 px-10 flex items-center justify-between shadow-2xl rounded-t-xl shadow-black bg-slate-50'>
    <button onClick={() => setSelected('home')}
       className={`nav-item ${selected === 'home' ? 'selected' : ''}`}>
      <Link href='/'>
        <img src='/home.svg' alt='home'  />
      </Link>
    </button>
    <button onClick={() => setSelected('services')}
       className={`nav-item ${selected === 'services' ? 'selected' : ''}`}>
      <Link href='/services'>
        <img src='/arrow.svg' alt='trx'  />
      </Link>
    </button>
    <button onClick={() => setSelected('profile')}
       className={`nav-item ${selected === 'profile' ? 'selected' : ''}`}>
      <Link href='/profile'>
        <img alt='profile' src='/profile.svg'  />
      </Link>
    </button>
  </nav>
    </div>
);
};

export default Navbar;
