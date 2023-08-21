'use client';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import { SafeUser } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import StudyCard from './StudyCard';
import { Study } from '@prisma/client';
import useOpenStudyModal from '@/hooks/useOpenStudyModal';
import { AiOutlinePlusCircle } from 'react-icons/ai';

interface StudyOwnWrapperProps {
  ownStudies: Study[];
  currentUser?: SafeUser | null;
}

const StudyOwnWrapper: FC<StudyOwnWrapperProps> = ({
  ownStudies,
  currentUser,
}) => {
  const router = useRouter();
  const openStudyModal = useOpenStudyModal();
  const [deletingId, setDeletingId] = useState('');
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/studyRegister/${id}`)
        .then(() => {
          toast.success('개설한 스터디를 닫았습니다.');
          router.refresh();
        })
        .catch(() => {
          toast.error('개설한 스터디를 닫지 못했습니다.');
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );
  return (
    <Container>
      <div className='pt-24 pb-8'>
        <Heading
          title='내가 개설한 Study 목록'
          subtitle='내가 리더로 등록한 Study 목록입니다.'
        />
        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {ownStudies.map((study) => (
            <StudyCard
              key={study.id}
              data={study}
              actionId={study.id}
              onAction={onCancel}
              disabled={deletingId === study.id}
              actionLabel={'스터디 삭제'}
              currentUser={currentUser}
            />
          ))}
          <div
            className='col-span-1 flex min-h-[150px] rounded-xl border border-gray-200 bg-white drop-shadow-lg items-center justify-center cursor-pointer group '
            onClick={() => openStudyModal.onOpen()}
          >
            <div className='flex gap-2'>
              <AiOutlinePlusCircle size={24} />
              <div className='text-lg font-bold '>스터디 개설하기</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default StudyOwnWrapper;
