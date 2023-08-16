'use client';

import { useCallback, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import useRegisterModal from '@/hooks/useRegisterModal';

const LoginModal = ({}) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      console.log(callback);
      if (callback?.error) {
        toast.error('메일과 비밀번호를 확인해주세요.');
      } else if (callback?.ok) {
        toast.success('로그인 성공!');
        router.refresh();
        loginModal.onClose();
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='StudyWith에 다시 오셨군요.'
        subtitle='StudyWith과 함께 다시 달려볼까요?'
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
        id='password'
        type='password'
        label='Password'
        disabled={isLoading}
        register={register}
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
        label='Google 계정으로 로그인'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Github 계정으로 로그인'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className='flex flex-row items-center justify-center gap-2'>
        <div>Space에 처음이신가요?</div>
        <div
          onClick={toggle}
          className='text-neutral-800 cursor-pointer hover:underline'
        >
          계정 생성하기
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
