'use client';

import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import useRegisterModal from '@/hooks/useRegisterModal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/hooks/useLoginModal';

const RegisterModal = ({}) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('회원가입 성공!');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 409) {
          toast.error('중복된 이메일이에요!');
        } else {
          toast.error('뭔가 잘못됐어요!');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='StudyWith에 오신 것을 환영합니다.'
        subtitle='StudyWith과 함께 열심히 달려보아요.'
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        pattern={{
          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          message: '메일 형식 확인',
        }}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        pattern={{
          value: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]{2,10}$/,
          message: '특수문자 제외 2~10자',
        }}
        errors={errors}
        required
      />
      <Input
        id='password'
        type='password'
        label='Password'
        disabled={isLoading}
        register={register}
        pattern={{
          value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{4,}$/,
          message: '영문, 숫자, 특수문자를 포함 4자 이상',
        }}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Google 계정으로 시작하기'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Github 계정으로 시작하기'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className='flex flex-row items-center justify-center gap-2'>
        <div>이미 계정이 있으신가요?</div>
        <div
          onClick={toggle}
          className='text-neutral-800 cursor-pointer hover:underline'
        >
          Login
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
