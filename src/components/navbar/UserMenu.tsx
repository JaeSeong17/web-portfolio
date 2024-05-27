'use client';

import { FC, useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/types';
import { useRouter } from 'next/navigation';
import useOpenStudyModal from '@/hooks/useOpenStudyModal';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const openStudyModal = useOpenStudyModal();
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onOpenStudy = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    openStudyModal.onOpen();
  }, [currentUser, loginModal, openStudyModal]);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onOpenStudy}
          className='hidden md:block border-[1px] border-neutral-200 text-sm font-semiblod py-3 px-4 rounded-full hover:bg-neutral-100 hover:shadow-md transition cursor-pointer'
        >
          새 스터디 등록
        </div>
        <div
          onClick={toggleOpen}
          className='p-4 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className='absolute
                    rounded-xl
                    shadow-md
                    w-[40vw]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0 top-12 text-sm'
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div className='flex flex-col'>
            {currentUser ? (
              <>
                <div className='px-4 py-3 font-semibold'>
                  {currentUser.name} 님
                </div>
                <hr />
                <MenuItem
                  onClick={() => {
                    router.push('/favorites');
                  }}
                  label={'내가 좋아한 Study'}
                />
                <MenuItem
                  onClick={() => {
                    router.push('/studyRegistrations');
                  }}
                  label={'내가 신청한 Study'}
                />
                <MenuItem
                  onClick={() => {
                    router.push('/studyOwn');
                  }}
                  label={'내가 개설한 Study'}
                />
                <hr />
                <MenuItem onClick={() => signOut()} label={'Logout'} />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label={'Login'} />
                <MenuItem onClick={registerModal.onOpen} label={'Sign up'} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
