import * as z from "zod";

// USER
export const SignupValidation = z.object({
phone_number : z.string().min(7 , {message : "Phone Number is Not Valid!"}),
  first_name: z.string().min(2, { message: "first name must be at least 2 characters." }),
  last_name : z.string().min(2, { message: "last name must be at least 2 characters." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmpassword : z.string()
}).refine((data) => data.password === data.confirmpassword, {
    message: "Passwords MUST match",
    path: ["confirmpassword"],
  });

export const SigninValidation = z.object({
  phone_number : z.string().min(7 , {message : "Phone Number is Not Valid!"}),
  password: z.string().min(8, { message: " Enter Your Correct Password." }),
});

export const KycValidation = z.object({
  passport_number : z.string().min(5, {message : "Invalid Passport Number"}),
  birth_date : z.string(),
  passport_expiry : z.string() ,
  address : z.string().min(4,{message:"Address is at least 4 characters!"}),
  photo1: z
  .custom<File>((v) => v instanceof File, {
    message: 'passport Photo is required',
  }),
  photo2: z
  .custom<File>((v) => v instanceof File, {
    message: 'IdCard photo is required',
  })
})

export const CardValidation = z.object({
  cardnumber : z.string().min(12 , {message : 
    "Cards are at least 12 digits!"
  }), 
  expiry : z.string(),
  cvv : z.string().length(3 , {message : ""})
  })