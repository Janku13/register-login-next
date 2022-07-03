import React,{useState} from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { object, string, TypeOf } from "zod"
import axios from 'axios'

const  createUserSchema = object({
    name: string().nonempty({
      message:"Name is required"
    }),
    password: string().min(6,"Password too short - should be 6  chars minimum").nonempty({
      message:"Password is required"
    }),
    passwordConfirmation: string().nonempty({
      message:"Password confirmation is required"
    }),
    email: string().nonempty({
    message:"Email is required"
    }).email("Not a valid email")
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"]
})

type CreateUserInput = TypeOf<typeof createUserSchema>

  
function RegisterPage() {
  const router = useRouter()
  const [callError, setCallError] = useState('')
  
  const { register, formState: { errors }, handleSubmit } = useForm<CreateUserInput> ({
    resolver : zodResolver(createUserSchema)
  })
  
  const submit = async (values:CreateUserInput) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`, values)
      router.push('/')
    } catch (e:any) {
      setCallError(e.message)
      }
  }
  return (
    <>
      <p>{callError}</p>
      <form onSubmit={handleSubmit(submit)}>
      <div className='form-element'>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Type email" {...register('email')} />
        {errors.email && <p>{ errors.email.message}</p>}
      </div>
        <div className="form-element">
          <label htmlFor="name">Name</label>
          <input
          id="name"
            type="text"
            placeholder="Jane Doe"
            {...register("name")}
          />
          {errors.name && <p>{ errors.name.message}</p>}
        </div>
       <div className='form-element'>
          <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Type password" {...register('password')} />
        {errors.password && <p>{ errors.password.message}</p>}
      </div>
      <div className='form-element'>
        <label htmlFor="passwordConfirmation">Confirme Password</label>
        <input id="passwordConfirmation" type="password" placeholder="Type passwordConfirmation" {...register('passwordConfirmation')} />
         {errors.passwordConfirmation && <p>{ errors.passwordConfirmation.message}</p>}
      </div>
      
      <button type='submit'>Register</button>
    </form>
      </>

  )
}

export default  RegisterPage