import React from 'react';
import { Button } from '@/Components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card';
import { auth } from './firebaseStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendPasswordResetEmail } from 'firebase/auth';
import FormInput from './FormInput';
import useDocTitle from './useDocTitle';

const ForgetPassword = () => {
  const navigate = useNavigate();
  useDocTitle('Reset Password');

  const schema = z.object({
    email: z.string().email('Email Not Allowed'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const hanldeResetPassword = async () => {
    const emailVal = watch('email');
    try {
      await sendPasswordResetEmail(auth, emailVal);
      toast.success('Check your email! A password reset link has been sent !');
      navigate('/login');
    } catch {
      toast.error('Oops! An Error Occurred !');
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(hanldeResetPassword)}>
            <div className='flex flex-col gap-6'>
              <FormInput
                name='email'
                labelText='email'
                error={errors.email}
                register={register}
                type='email'
                placeholder='m@example.com'
                required={true}
              />
            </div>
            <Button type='submit'>Reset</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPassword;
