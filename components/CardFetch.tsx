import React, { useEffect, useState } from 'react';
import { PiHandWithdraw } from 'react-icons/pi';
import { BiTransferAlt } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { MdOutlineAddCard } from "react-icons/md";
import Link from 'next/link';

interface Card {
  card_number: string;
  first_name: string;
  last_name: string;
  expiry: string;
}

const CardFetchComponent: React.FC = () => {
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('https://demo.arcaneageis.com/api/get-card', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200 || response.status === 201) {
          const data = await response.json();
          setCard(data);
          console.log(data)
        } else {
          setError('Failed to fetch card');
        }
      } catch (err : any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, []);

  if (loading) return (
    <div className="flex flex-col py-10 my-5 bg-slate-100 gap-3 items-center w-full justify-center mx-auto">
  <img
      src="/loader.svg"
      alt="loader"
      width={24}
      height={24}
      className="animate-spin"
    />
  <p>Loading card data...</p>
</div>
  )
  

  if (card?.card_number === '' || card?.first_name == '' || error) 
    return(
  <>
     <Link href='/add-card' className='bg-[#B1B1B1] flex flex-col items-center justify-center gap-5 text-black p-6 w-full rounded-3xl text-center'>
    <p className='text-xl '>Add new card</p>
    <img alt='card' src='card-add.svg'/>
    </Link>
    <Link href='/services' className='flex flex-col gap-2 -mt-16 ml-5 opacity-80'>         
    <FaPlus className="text-black border-2 border-black rounded-lg p-1 size-7 ml-1" />
    <p className='text-xs'>Top up</p>
 </Link>
 </>

    );

  return (
    <div key={card?.card_number} className="bg-black text-white px-8 py-5 rounded-3xl w-full">
      <div className='flex justify-between '>
        <div>{card?.card_number}</div>
        <div>VISA</div>
      </div>
      <div className="flex items-center justify-start gap-5 my-4">
        <div>
          <p className="text-xs text-zinc-500">Card owner name</p>
          <p className="text-sm font-bold text-white">{card?.first_name} &nbsp; {card?.last_name}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Expiration date</p>
          <p className="text-sm font-bold text-white">{card?.expiry}</p>
        </div>
        <img src="/visa.svg" alt="visa" className='size-24 absolute right-5 top-[340px]' />
      </div>
      <div className='h-px w-52 bg-zinc-400 mb-3 ' />
      <div className="flex gap-5 px-5 py-2 items-center justify-start -ml-5">
        <div className='flex flex-col items-center justify-center gap-2'>          
          <PiHandWithdraw className="text-white border border-white rounded-lg p-1 size-7" />
          <p className='text-xs text-center'>withdraw</p>
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>         
           <BiTransferAlt className="text-white border border-white rounded-lg p-1 size-7" />
           <p className='text-xs text-center'>transfer</p>
        </div>
        <div className='flex flex-col items-center justify-center gap-2'>         
        <Link href='/services'>         
    <FaPlus className="text-black border-2 border-black rounded-lg p-1 size-7 ml-1" />
    <p className='text-xs'>Top up</p>
 </Link>
        </div>
        </div>
    </div>
  );
};

export default CardFetchComponent;
