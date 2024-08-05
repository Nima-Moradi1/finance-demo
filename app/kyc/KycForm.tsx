'use client'

import React, { useState } from 'react'
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
import { KycValidation } from '@/lib/validation'
import { Input } from '@/components/ui/input'
import CenterWidthWrapper from '@/components/CenterWidthWrapper';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'




const KycForm = () => {
  const router = useRouter()
    const [passportImagePreview, setPassportImagePreview] = useState<string | null>(null);
    const [idImagePreview, setIdImagePreview] = useState<string | null>(null);
// form
    const form = useForm<z.infer<typeof KycValidation>>({
        resolver: zodResolver(KycValidation),
        defaultValues: {
            passport_number: "",
            birth_date: "",
            passport_expiry : "" ,
            address : "" ,
            photo1 : undefined,
            photo2 : undefined
        },
        mode : "onBlur"
      });
      
      const {formState:{isSubmitting},control} = form
      
      //handling the submission 
    const handleKyc = async (data: z.infer<typeof KycValidation>) => {
      const token = localStorage.getItem('token')
      try {
        const formData = new FormData();
        formData.append("passport_number", data.passport_number);
        formData.append("birth_date", data.birth_date);
        formData.append("passport_expiry", data.passport_expiry );
        formData.append("address", data.address);
        formData.append('photo1',data.photo1)
        formData.append('photo2',data.photo2)
        
       // POST REQ 
       const response = await fetch('https://demo.arcaneageis.com/api/kyc' , {
        method : "POST" ,
        headers : {
          "Authorization" : `Bearer ${token}`
        } , 
        body : formData
      })
      if(response.status === 200 || response.status === 201) {
        const data = await response.json() ;
        console.log(data.message)
        toast.success('KYC Completed !')
        router.push('/add-card')
        
      } else {
        
      }
        } catch(err) {
          console.log(err)
        }
      
    }


    const handlePassportImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPassportImagePreview(URL.createObjectURL(file));
            form.setValue("photo1", file); // Set single file
        }
    };

    const handleIdImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIdImagePreview(URL.createObjectURL(file));
            form.setValue("photo2", file); // Set single file
        }
    };


  return (
    <>
    <CenterWidthWrapper>
        
         <Form {...form}>
      <div className=" flex-center flex-col">
        <h2 className="font-bold text-xl text-center tracking-wider ">
        Enter your contact
        <br/>Information
        </h2>
        

        <form
          onSubmit={form.handleSubmit(handleKyc)}
          className="flex flex-col gap-2 w-full mt-5">
           <FormField
            control={form.control}
            name="passport_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Passport Number</FormLabel>
                <FormControl className='text-xs'>
                  <Input  type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birth_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Date of birth</FormLabel>
                <FormControl className=' text-xs text-zinc-500'>
                    <Input  type="date" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="passport_expiry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Expiration date</FormLabel>
                <FormControl className='text-xs text-zinc-500'>
                  <Input type="date" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Address</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
             <FormField
            control={form.control}
            name="photo1"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Upload Passport photo </FormLabel>
                <FormControl className='text-zinc-500 text-xs'>
                <Input
              type="file"
              className="shad-input"
              onChange={handlePassportImageChange}
              ref={(e) => {
              field.ref(e);
            if (e) e.onchange = (ev) => handlePassportImageChange(ev as unknown as React.ChangeEvent<HTMLInputElement>);
            }}
             />
            </FormControl>
            
            {passportImagePreview && <img src={passportImagePreview} alt="Passport Preview" className="mt-2 size-10" />}
            
       <FormMessage />
       </FormItem>
       )}
    />
          <FormField
            control={form.control}
            name="photo2"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Upload ID card photo </FormLabel>
                <FormControl className='text-zinc-500 text-xs'>
                <Input
              type="file"
              className="shad-input"
              onChange={handleIdImageChange}
              ref={(e) => {
              field.ref(e);
            if (e) e.onchange = (ev) => handleIdImageChange(ev as unknown as React.ChangeEvent<HTMLInputElement>);
            }}
             />
            </FormControl>
            
            {idImagePreview && <img src={idImagePreview} alt="IDcard Preview" className="mt-2 size-10" />}
            
       <FormMessage />
       </FormItem>
       )}
    />
          <Button
          isLoading={isSubmitting}
          disabled={isSubmitting || !passportImagePreview || !idImagePreview}
          loadingText='Please Wait'
          type="submit" className="mt-5">
              Next
          </Button>

         
        </form>
      </div>
    </Form></CenterWidthWrapper></>
   
  )
}

export default KycForm