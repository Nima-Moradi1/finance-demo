import { CardValidation, KycValidation, SigninValidation, SignupValidation } from "@/lib/validation";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";

const BASE_URL = 'https://demo.arcaneageis.com'
    // login 
   export const handleLogin = async (data: z.infer<typeof SigninValidation>) => {
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
                redirect('/kyc')
                
            } else {
                const errorData = await response.json();
                toast.error(`Login failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Error during login. Please try again.');
        }
    }

    //signup 
    export const handleSignup = async (data: z.infer<typeof SignupValidation>) => {
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
             redirect('/login')
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }
    
    //kyc 
    export const handleKyc = async (data: z.infer<typeof KycValidation>) => {
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
         const response = await fetch(`${BASE_URL}/api/kyc` , {
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
          redirect('/add-card')
          
        } else {
          toast.error('Failed to Validate!')
        }
          } catch(err) {
            console.log(err)
          }
        
    }

    //adding card
    export const handleCardAdd = async (data: z.infer<typeof CardValidation>) => {
        try {
          const token = localStorage.getItem('token')
            const formData = new FormData();
            formData.append("cardnumber", data.cardnumber || '');
            formData.append("cvv", data.cvv);
            formData.append("expiry", data.expiry);
  
            const response = await fetch(`${BASE_URL}/api/add-card`, {
                method: 'POST',
                headers: {
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
  
           
            if (response.status === 200 || response.status === 201) {
                toast.success('Card Added Successfully!');
                const data = await response.json()              
                redirect('/');
            } else {
                const errorData = await response.json();
                toast.error(`Adding failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error during Adding Card:', error);
            toast.error('Error Adding card, try again.');
        }
    }


    //fetching the card details
    export const fetchCard = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`${BASE_URL}/api/get-card`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
  
          if (response.status === 200 || response.status === 201) {
            const data = await response.json();
            console.log(data)
          } else {
            toast.error('Failed to fetch card');
          }
        } catch (err : any) {
          toast.error(err.message);
        } 
        // finally {
        //   setLoading(false);
        // }
    };

    //getting balance
    export const fetchBalance = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`${BASE_URL}/api/get-balance`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
  
          if (response.status === 200 || response.status === 201) {
            const data = await response.json();
            console.log(data)
          } else {
            toast.error('Failed to fetch balance');
          }
        } catch (err : any) {
          toast.error(err.message);
        } 
        // finally {
        //   setLoading(false);
        // }
    };

    //fetching transactions
   export const fetchTransactions = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${BASE_URL}/api/get-transactions`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        const data = await response.json();
        return data
      } else {
        toast.error('Failed to fetch card');
      }
    } catch (err : any) {
      toast.error(err.message);
     }
    // finally {
    //   setLoading(false);
    // }
};