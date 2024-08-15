'use client'

// in this file , after the user scans a qrCode, we fetch the api and show the user 
//if the deposit was either successful or failure!
import { BASE_URL } from '@/app/__api'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import CenterWidthWrapper from './CenterWidthWrapper'
import Loader from './Loader'
import Link from 'next/link'
import { Button } from './ui/button'



export const PaymentModal = () => {
    const [error , setError] = React.useState('')
    const [success , setSuccess] = React.useState('')
    const [loading , setLoading] = React.useState(false)

const deviceid = useSearchParams().get('deviceid')
const hash = useSearchParams().get('hash')

useEffect(()=> {
    console.log("___deviceid fetched from params is____ :" , deviceid)
    console.log("_____hash fetched from params is____ :" , hash)
 // Trigger the depositAtm function once the QR code is scanned and params are available
 if (deviceid && hash) {
    depositAtm(deviceid, hash);
} else {
    setError('DeviceId or Hash was not found in the URL!')
}
}, [deviceid, hash]);



    const depositAtm = async (deviceid:string,hash:string) => {
        setLoading(true)
        try{
            const token = localStorage.getItem('token')
            const response = await 
        fetch(`${BASE_URL}/api/validate?deviceid=${deviceid}&hash=${hash}`, {
            method: 'GET' , 
            headers : {
                'Authorization': `Bearer ${token}`
            }
        }) 
        if(response.status === 200 || response.status === 201) {
            const data = await response.json()
            setSuccess("Deposit Successful!")
            return data
        } else {
            if(response.status === 400 || response.status === 401) {
                setError('Failed Trying to Deposit. Please Scan the code again or try again later.')
            }
        }
        }
        catch(error) {
            console.log("error from payment modal:" , error)
            setError(JSON.stringify(error))
            return JSON.stringify(error)
        } finally {
            setLoading(false);
          }
        
      }
      if(loading) {
        return (
            <CenterWidthWrapper>
                <div className='flex text-center text-2xl w-full justify-center items-center gap-5'> 
                    <p>Please wait...</p>
                   <img src='/loader.svg' className='size-6' alt='loader'/>
                </div>
            </CenterWidthWrapper>
        )
      }
      if(error) { 
        return (
            <CenterWidthWrapper>
                <div className='text-center flex flex-col justify-center items-center w-full mx-auto bg-red-400 m-3 px-3 py-10 rounded-xl'>
                    <p className='mb-12'>
                      Error : &nbsp;{error}
                    </p>
                <Button size='lg'>
                    <Link href='/services'>Return to Services</Link>
                </Button>
                </div>
            </CenterWidthWrapper>
        )
    }
    if(success) {
        return (
            <CenterWidthWrapper>
                <div className='flex flex-col gap-5 items-center justify-center'>
                    <p
                    className='bg-teal-400 w-full text-center mx-auto px-3 py-10 rounded-xl'
                    >Deposit was Successful!&nbsp;✅</p>
                    <Link href='/'>
                    <Button variant='secondary' size='sm' asChild>
                        Return Home
                    </Button>
                    </Link>
                </div>
            </CenterWidthWrapper>
        )
    }
}

