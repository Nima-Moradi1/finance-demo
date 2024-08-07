import Link from 'next/link';

export default function NotFound() {

   return ( 
    <div className='flex items-center justify-center gap-20 mx-5 dark:bg-background min-h-screen'>
      <div className='hidden lg:block'>
        <img alt='not-found' src='/404.jpeg' className='w-96 rounded-3xl'/>
      </div>
        <div className="flex flex-col items-center justify-center gap-y-5
     dark:bg-background text-center"> 
    <h2 className="lg:hidden text-9xl font-bold text-gray-800 dark:text-gray-400">404</h2>
    <h1 className="text-3xl md:text-7xl font-bold text-gray-800 dark:text-gray-400">
    Page Not Found !
      </h1> 
    <p className="text-2xl text-gray-600 dark:text-gray-500 mt-4">
    Oops! The page you are looking for does not exist
     </p> 
      <Link 
      className="mt-6 px-6 py-3 bg-primary text-white rounded-lg
       text-lg hover:text-primary hover:bg-zinc-700 dark:hover:bg-white transition-all duration-300"
      href="/"> 
     Return Home
       </Link> 
       </div> 
    </div>

       );
       }