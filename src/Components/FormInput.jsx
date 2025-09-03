import React from 'react'
import { Label } from '@/Components/ui/label'
import InputField from './InputField'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/Components/ui/button'

const FormInput = ({
  label,
  error,
  rightElement,
  rightNavigateElement,
  ...props
}) => {
  const navigate = useNavigate()
  return (
    <div className='grid gap-2'>
      <div className='flex items-center justify-between'>
        <Label htmlFor={label}>{label}</Label>
        {rightElement && (
          <Button
            type='button'
            variant='link'
            onClick={() => navigate(rightNavigateElement)}
          >
            {rightElement}
          </Button>
        )}
      </div>

      <InputField {...props} />

      {error?.message && (
        <p className='text-red-500 text-sm'>{error.message}</p>
      )}
    </div>
  )
}

export default FormInput
