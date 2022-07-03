import React,{useState} from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { object, string, TypeOf } from "zod"
import axios from 'axios'

const   createSessionSchema = object({

    email: string().nonempty({
      message:'email is required'
    }),
    password: string().nonempty({
      message:'password is required'
    })
  })



type CreateSessionInput = TypeOf<typeof createSessionSchema>

  
function LoginPage() {
  const router = useRouter()
  const [callError, setCallError] = useState('')
  
  const { register, formState: { errors }, handleSubmit } = useForm<CreateSessionInput> ({
    resolver : zodResolver(createSessionSchema)
  })
  
  const submit = async (values:CreateSessionInput) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`, values,{withCredentials:true})
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
   
       <div className='form-element'>
          <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Type password" {...register('password')} />
        {errors.password && <p>{ errors.password.message}</p>}
      </div>
      
      <button type='submit'>Register</button>
    </form>
      </>

  )
}

export default  LoginPage