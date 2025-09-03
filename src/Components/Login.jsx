import React from 'react'
import { Button } from '@/Components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle
} from '@/Components/ui/card'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebaseStore'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from './FormInput'
import { useDispatch } from 'react-redux'
import { login } from './authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const schema = z.object({
    email: z.string().email('Email Not Allowed'),
    password: z.string().min(6, 'Password must have more than 6 characters')
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })

  const handleLogin = async data => {
    const { email, password } = data
    try {
      await signInWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser
      dispatch(login({ uid: user.uid, email: user.email }))
      toast.success(`Login Successfully!`)
      navigate('/dashboard')
    } catch {
      toast.error('Oops! Incrrect Email or password')
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardAction>
          <Button variant='link' onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className='flex flex-col gap-6'>
            <FormInput
              name='email'
              label='email'
              error={errors.email}
              register={register}
              type='email'
              placeholder='m@example.com'
              required={true}
            />
            <FormInput
              name='password'
              label='password'
              error={errors.password}
              register={register}
              type='password'
              required={true}
              rightNavigateElement='/resetPassword'
              rightElement='Forgot your password?'
            />
          </div>
          <Button type='submit'>Login</Button>
        </form>
      </CardContent>
    </Card>
  )
}
export default Login
