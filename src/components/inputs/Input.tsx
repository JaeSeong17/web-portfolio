'use client';

import { FC } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  ValidationRule,
} from 'react-hook-form';
import { BiWon } from 'react-icons/bi';
import { OpenStudyFormData } from '../modals/OpenStudyModal';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  pattern?: ValidationRule<RegExp>;
  register: UseFormRegister<OpenStudyFormData> | UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  register,
  required,
  pattern,
  errors,
}) => {
  return (
    <div className='w-full relative'>
      {formatPrice && (
        <BiWon size={24} className='text-neutral-700 absolute top-5 left-2' />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required, pattern })}
        placeholder=''
        type={type}
        className={`peer w-full pt-6 pb-2 font-light bg-white border-2 rounded-none transition disabled:opacity-70 disabled:cursor-not-allowed 
        ${formatPrice ? 'pl-8' : 'pl-4'}
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}`}
      />
      <label
        className={`
          absolute text-md durtaion-150 transform -translate-y-3 top-5 z-10 origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
        {errors[id]?.message && ' - ' + errors[id]?.message?.toString()}
      </label>
    </div>
  );
};

export default Input;
