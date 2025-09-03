import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
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
import { toast } from 'sonner';
import { auth, database } from './firebaseStore';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from 'firebase/auth';
import uploadImageToCloudinary from './uploadImageToCloudinary';
import fetchUserData from './fetchUserData';
import FormInput from './FormInput';
import Loading from './Loading';

const UpdatePage = () => {
  const [loading, setLoading] = useState(true);
  const [profileImageURL, setProfileImageURL] = useState('');
  const [newImageFile, setNewImageFile] = useState(null);

  const navigate = useNavigate();
  const schema = z.object({
    name: z.string().min(2, 'Name must have more than 2 characters'),
    email: z.string().email('Your email not allowed'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '' },
  });

  useEffect(() => {
    fetchUserData({
      onSuccess: data => {
        reset({
          name: data.name || '',
          email: data.email || '',
        });
        setProfileImageURL(data.profileImage || '');
        setLoading(false);
      },
      onFail: () => setLoading(false),
    });
  }, [reset]);

  const handleUpdate = async data => {
    const user = auth.currentUser;
    if (!user) return toast.error('user not logged in');

    try {
      let newImageURL = profileImageURL;

      if (newImageFile) {
        newImageURL = await uploadImageToCloudinary(newImageFile);
      }

      if (user.email !== data.email) {
        const password = prompt('Enter your current password : ');
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
        await verifyBeforeUpdateEmail(user, data.email, {
          url: `${window.location.origin}/login`,
          handleCodeInApp: true,
        });
      }

      await updateDoc(doc(database, 'Users', user.uid), {
        name: data.name,
        email: data.email,
        profileImage: newImageURL,
      });
      setProfileImageURL(newImageURL);
      toast.success('Update Successfully !');
      navigate('/dashboard');
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Oops ! Update failed');
    }
  };

  const changePhoto = e => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Card>
          <CardHeader className='grid grid-cols-[1fr_auto] justify-between w-full'>
            <CardTitle>Update Data</CardTitle>
            <Avatar className='w-12 h-12 inline-block'>
              <AvatarImage src={profileImageURL} alt='Profile picture' />
              <AvatarFallback>Image</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                  <FormInput
                    name='email'
                    labelText='email'
                    error={errors.email}
                    register={register}
                    type='email'
                  />
                </div>
                <div className='felx flex-col gap-2'>
                  <FormInput
                    name='name'
                    labelText='name'
                    error={errors.name}
                    register={register}
                    type='text'
                  />
                </div>
                <div className='flex flex-row gap-2'>
                  <FormInput
                    name='image'
                    labelText='Update Your photo'
                    register={register}
                    type='file'
                    accept='image/*'
                    onChange={changePhoto}
                  />
                </div>
              </div>
              <Button type='submit'>Save</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
export default UpdatePage;
