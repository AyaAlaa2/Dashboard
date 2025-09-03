import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { Button } from '@/Components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/Components/ui/card'
import { Label } from '@/Components/ui/label'
import { auth } from './firebaseStore'
import { useNavigate } from 'react-router-dom'
import fetchUserData from './fetchUserData'
import { Logout } from './Logout'
import { SendValidation } from './SendValidation'
import Loading from './Loading'

const Dashboard = () => {
  const [userDetailes, setUserDetailes] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchUserData({
      onSuccess: data => {
        setUserDetailes(data)
        setLoading(false)
      },
      onFail: () => setLoading(false)
    })
  }, [])

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Card>
          <CardHeader className='grid grid-cols-[1fr_auto] justify-between w-full'>
            <CardTitle>Welcome !</CardTitle>
            <Avatar className='w-12 h-12 inline-block'>
              <AvatarImage
                src={userDetailes?.profileImage}
                alt='Profile picture'
              />
              <AvatarFallback>Image</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <div>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col'>
                  <div className='flex flex-row gap-2'>
                    <Label>Email :</Label>
                    <p className='text-white dark:text-black'>
                      {userDetailes.email}
                    </p>
                  </div>
                  {userDetailes.email !== auth.currentUser.email && (
                    <p className='text-red-500 text-sm mt-2 ps-3'>
                      You must activate your new email
                    </p>
                  )}
                </div>
                <div className='flex flex-row gap-2'>
                  <Label>Name :</Label>
                  <p className='text-white dark:text-black'>
                    {userDetailes.name}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex-col gap-2 mt-5'>
            <Button
              type='submit'
              onClick={() => {
                navigate('/updateUser')
              }}
            >
              Update
            </Button>

            <SendValidation />
            <Logout />
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default Dashboard
