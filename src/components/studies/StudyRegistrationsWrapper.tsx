'use client';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import { SafeUser, StudyRegistrationWithStudy } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import StudyCard from './StudyCard';

interface StudyRegistrationsWrapperProps {
  myStudyRegistrations: StudyRegistrationWithStudy[];
  currentUser?: SafeUser | null;
}

const StudyRegistrationsWrapper: FC<StudyRegistrationsWrapperProps> = ({
  myStudyRegistrations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/studyRegister/${id}`)
        .then(() => {
          toast.success('스터디 등록(신청)을 취소했습니다.');
          router.refresh();
        })
        .catch(() => {
          toast.error('스터디 등록(신청)을 취소하지 못했습니다.');
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );
  return (
    <Container>
      <div className='pt-24'>
        <Heading
          title='내가 등록(신청)한 Study 목록'
          subtitle='개설된 Study에 멤버로 등록(신청)한 Study 목록입니다.'
        />
        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {myStudyRegistrations.map((reg) => {
            if (reg.study.leaderId !== currentUser?.id) {
              return (
                <StudyCard
                  key={reg.id}
                  data={reg.study}
                  registration={reg}
                  actionId={reg.id}
                  onAction={onCancel}
                  disabled={deletingId === reg.id}
                  actionLabel={reg.accepted ? '등록 취소' : '신청 취소'}
                  currentUser={currentUser}
                />
              );
            }
          })}
        </div>
      </div>
    </Container>
  );
};

export default StudyRegistrationsWrapper;
