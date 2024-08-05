'use client'

import React from 'react'
import {Button} from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormState } from "react-hook-form"
import 'react-phone-input-2/lib/style.css'
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { SigninValidation } from '@/lib/validation'
import { Input } from '@/components/ui/input'
import CenterWidthWrapper from '@/components/CenterWidthWrapper';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { BASE_URL } from '../__api'



const LoginForm = () => {
  const router = useRouter()
// form
    const form = useForm<z.infer<typeof SigninValidation>>({
        resolver: zodResolver(SigninValidation),
        defaultValues: {
          phone_number: undefined,
          password: "",
        },
        mode : "onBlur"
      });
      
      const {formState:{isSubmitting},control} = form
      const { isValid } = useFormState({ control });
      
      const handleLogin = async (data: z.infer<typeof SigninValidation>) => {
    
            try {
                const formData = new FormData();
                formData.append("phone_number", data.phone_number || '');
                formData.append("password", data.password);
      
                const response = await fetch(`${BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
      
               
                if (response.status === 200 || response.status === 201) {
                    toast.success('Logged in!');
                    const data = await response.json()
                    const token = data.token ;
                    localStorage.setItem('token' , token)
                    router.push('/kyc')
                    
                } else {
                    const errorData = await response.json();
                    toast.error(`Login failed: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Error during login:', error);
                toast.error('Error during login. Please try again.');
            }
        }


  return (
    <>
    <CenterWidthWrapper>
        
         <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <h2 className="font-bold text-3xl text-center ">
          Welome back!
        </h2>
        <p className="text-center text-gray-500 text-sm mt-2">
          Please enter your number and password
          <br/>to login to your account!
        </p>

        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex flex-col gap-5 w-full mt-5">
           <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Phone Number</FormLabel>
                <FormControl className='text-xs'>
                  <Input placeholder='989122113432' type="number" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           
 <div className="text-sm text-light-2 text-center mt-2 text-zinc-500">
          Do not have an account ? 
          <Link href='/signup'
          className='text-blue-600 mx-2 font-bold'
          >
            Sign up
          </Link>
           
          </div>
          <Button
          isLoading={isSubmitting}
          disabled={isSubmitting || !isValid}
          loadingText='Please Wait'
          type="submit">
              Next
          </Button>

         
        </form>
      </div>
    </Form></CenterWidthWrapper></>
   
  )
}

export default LoginForm