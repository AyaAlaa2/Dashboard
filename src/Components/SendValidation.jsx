import { auth } from './firebaseStore';
import { sendEmailVerification } from 'firebase/auth';
import { toast } from 'sonner';
import { Button } from '@/Components/ui/button';

export const SendValidation = () => {
  const handleSendValidation = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success('A verification link has been sent to your email address');
    } catch {
      toast.error('Failed to send verification link. Please try again later');
    }
  };

  return (
    <Button onClick={() => handleSendValidation()}>
      Send Vertification Link
    </Button>
  );
};
