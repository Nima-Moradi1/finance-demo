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
import { CardValidation } from '@/lib/validation'
import { Input } from '@/components/ui/input'
import CenterWidthWrapper from '@/components/CenterWidthWrapper';
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'




const Card = () => {
// button configuration for form 


// form
    const form = useForm<z.infer<typeof CardValidation>>({
        resolver: zodResolver(CardValidation),
        defaultValues: {
          cardnumber : "" ,
          cvv : "", 
          expiry : ""
        },
        mode : "onBlur"
      });
      
      const { formState:{isSubmitting , errors},control} = form
      const { isValid } = useFormState({ control });
      //router 
      const router = useRouter()
    //adding card handler 
    const handleCardAdd = async (data: z.infer<typeof CardValidation>) => {
      try {
        const token = localStorage.getItem('token')
          const formData = new FormData();
          formData.append("cardnumber", data.cardnumber || '');
          formData.append("cvv", data.cvv);
          formData.append("expiry", data.expiry);

          const response = await fetch('https://demo.arcaneageis.com/api/add-card', {
              method: 'POST',
              headers: {
                  "Authorization" : `Bearer ${token}`
              },
              body: JSON.stringify(formData)
          });

         
          if (response.status === 200 || response.status === 201) {
              toast.success('Card Added Successfully!');
              router.push('/');
              const data = await response.json()              
          } else {
              const errorData = await response.json();
              toast.error(`Adding failed: ${errorData.message}`);
          }
      } catch (error) {
          console.error('Error during Adding Card:', error);
          toast.error('Error Adding card, try again.');
      }
  }



  return (
    <>
    <CenterWidthWrapper>
        
         <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <h2 className="font-bold text-4xl text-center ">
          Add your card
        </h2>
        <p className="text-center text-gray-500 text-sm mt-2">
          Enter your credit card info in the box below.
         
        </p>

        <form
          onSubmit={form.handleSubmit(handleCardAdd)}
          className="flex flex-col gap-5 w-full mt-5">
           <FormField
            control={form.control}
            name="cardnumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Card Number</FormLabel>
                <FormControl className='text-xs text-center '>
                  <Input
                   maxLength={25} // increased to 20 to account for the -
                   onKeyDown={(e) => {
                     const input = e.target as HTMLInputElement;
                     const value = input.value;
                     if (value.length === 4 && e.key !== 'Backspace' || value.length === 11 || value.length === 18 ) {
                       input.value += ' - ';
                     }
                   }}
                  placeholder='1234 5678 9101 1121' type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         <div className='flex flex-row-reverse items-center justify-center gap-5 '>
         <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Cvv</FormLabel>
                <FormControl className='text-center'>
                    <Input placeholder='CVV' type="number"  {...field}
                    maxLength={3}
                    className={`shad-input text-center ${errors.cvv ? 'border-red-500' : ''}`} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         <FormField
  control={form.control}
  name="expiry"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="shad-form_label">Expiration date</FormLabel>
      <FormControl className='text-center'>
        <Input
          placeholder='MM/YY'
          type="text"
          className="shad-input"
          maxLength={5} // increased to 5 to account for the /
          onKeyDown={(e) => {
            const input = e.target as HTMLInputElement;
            const value = input.value;
            if (value.length === 2 && e.key !== 'Backspace') {
              input.value += '/';
            }
          }}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
         </div>
           
 
          <Button
          isLoading={isSubmitting}
          disabled={isSubmitting || !isValid}
          loadingText='Please Wait'
          className='mt-10 mx-2'
          type="submit">
              Next
          </Button>

         
        </form>
      </div>
    </Form></CenterWidthWrapper></>
   
  )
}

export default Card