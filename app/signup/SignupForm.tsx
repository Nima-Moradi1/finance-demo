'use client'

import React from 'react'
import {Button} from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormState } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import toast from 'react-hot-toast'
import { SignupValidation } from '@/lib/validation'
import { Input } from '@/components/ui/input'
import CenterWidthWrapper from '@/components/CenterWidthWrapper';
import { BASE_URL, handleSignup } from '../__api'
import { useRouter } from 'next/navigation'



const SignupForm = () => {
  const router = useRouter()
// form
    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
          phone_number: undefined,
          password: "",
          confirmpassword : "" ,
          first_name : "" ,
          last_name : ""
        },
        mode : "onBlur"
      });
      
      const {formState:{isSubmitting},control} = form
      const { isValid } = useFormState({ control });
//handle signup logic
const handleSignup = async (data: z.infer<typeof SignupValidation>) => {
  try {
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("phone_number", data.phone_number || '');
      formData.append("password", data.password);

      const response = await fetch(`${BASE_URL}/register`, {
          method: 'POST',
          body: JSON.stringify(formData)
      });
      if(response.status == 201 || 200) {
        toast.success('Account Created !')
       router.push('/login')
      }
  } catch (error) {
      console.error('Error during registration:', error);
  }
}


  return (
    <>
    <CenterWidthWrapper>
        
         <Form {...form}>
      <div className=" flex-center flex-col">
        <h2 className="font-bold text-3xl text-center ">
          Get Started!
        </h2>
        <p className="text-center text-gray-500 text-sm mt-2">
          Please enter your mobile number 
          <br/>to verify your account
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-2 w-full mt-5">
           <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Phone Number</FormLabel>
                <FormControl className='text-xs'>
                  <Input placeholder='989122349087' type="number" className="shad-input" {...field} />
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
                    <div>
                    <Input type="password" className="shad-input" {...field} />
                    <span className='text-[10px] opacity-70'>At least 8 digits and one character</span>
                    </div>
                 
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">First Name <span className='text-red-400'>*</span></FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
             <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Last Name </FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
 <div className="text-sm text-light-2 text-center mt-2 text-zinc-500">
           By clicking &quot;Next&quot; you agree to the
           <p className='flex items-center justify-center gap-2'>
           <span
              className="text-blue-400">
              privacy policy 
            </span>
            and
            <span
              className="text-blue-400">
              terms of service 
            </span>
           </p>
           
          </div>
          <Button
          isLoading={isSubmitting}
          disabled={isSubmitting || !isValid}
          loadingText='Please Wait'
          type="submit" 
          className=''>
              Next
          </Button>

         
        </form>
      </div>
    </Form></CenterWidthWrapper></>
   
  )
}

export default SignupForm