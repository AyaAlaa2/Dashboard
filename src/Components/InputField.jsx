import React from 'react';
import { Input } from '@/Components/ui/input';

const InputField = ({
  label,
  type,
  name,
  register,
  placeholder,
  required,
  accept,
  onChange,
}) => {
  return (
    <Input
      id={label}
      type={type}
      {...register(name)}
      placeholder={placeholder}
      required={required}
      accept={accept}
      onChange={onChange}
    />
  );
};

export default InputField;
