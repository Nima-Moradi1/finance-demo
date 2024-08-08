
import React from 'react'
import {useRouter} from 'next/navigation'

export const CheckUserAuth = ({children} : {children : React.ReactNode}) => {
    const router = useRouter()
  const token = localStorage.getItem('token')
  if(token) {
    return (
      <>
      {children}
      </>
    )   
  }else {
    router.push('/login')
  }
}

