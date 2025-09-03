import React from 'react'
import { Button } from '@/Components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle
} from '@/Components/ui/card'
import { toast } from 'sonner'
import { auth, database } from './firebaseStore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import uploadImageToCloudinary from './uploadImageToCloudinary'
import FormInput from './FormInput'

const Signup = () => {
  const navigate = useNavigate()
  const formSchema = z.object({
    name: z.string().min(2, 'Name must have more than 2 characters'),
    email: z.string().email('Invaled Email'),
    password: z.string().min(6, 'Password must have more than 6 characters')
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      image: null
    }
  })

  const handleSignup = async data => {
    try {
      const { name, email, password } = data

      const imageFile = watch('image')?.[0]
      let imageURL = ''
      if (imageFile) {
        imageURL = await uploadImageToCloudinary(imageFile)
      }

      await createUserWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser

      if (user) {
        await setDoc(doc(database, 'Users', user.uid), {
          id: user.uid,
          email: user.email,
          name: name,
          password: password,
          profileImage: imageURL
        })
      }

      navigate('/login')
      toast.success(`Signup Successfully! Welcome ${name}`)
    } catch {
      toast.error('Oops! Signup failed')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardAction>
          <Button
            variant='link'
            className='cursor-pointer text-white dark:text-black'
            onClick={() => navigate('/login')}
          >
            Log in
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleSignup)}>
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
              name='name'
              label='name'
              error={errors.name}
              register={register}
              type='text'
              required={true}
            />

            <FormInput
              name='password'
              label='password'
              error={errors.password}
              register={register}
              type='password'
              required={true}
            />

            <FormInput
              name='image'
              label='Upload Image'
              register={register}
              type='file'
              required={true}
              accept='image/*'
            />
          </div>
          <Button type='submit'>Signup</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Signup
