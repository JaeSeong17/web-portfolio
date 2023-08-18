'use client';

import { FC, useRef } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { OpenStudyFormData } from '../modals/OpenStudyModal';

interface TextAreaInputProps {
  id: string;
  label: string;
  textCount: number;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<OpenStudyFormData>;
  errors: FieldErrors;
}

const TextAreaInput: FC<TextAreaInputProps> = ({
  id,
  label,
  textCount,
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className='w-full relative'>
      <div className='text-end'>{textCount}/200</div>
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={label}
        rows={5}
        maxLength={200}
        className={`peer w-full p-2 font-light bg-white border-2 rounded-none transition disabled:opacity-70 disabled:cursor-not-allowed 
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}`}
      />
    </div>
  );
};

export default TextAreaInput;
