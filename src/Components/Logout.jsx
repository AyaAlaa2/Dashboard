import { auth } from './firebaseStore'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/Components/ui/button'
import { useDispatch } from 'react-redux'
import { logout } from './authSlice'

export const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(logout())
      navigate('/login')
    } catch {
      toast.error('Oops ! An error Occured')
    }
  }

  return <Button onClick={handleLogout}>Log out</Button>
}
