'use client';

import { SafeStudy, SafeUser, StudyRegistrationWithStudy } from '@/types';
import { FC, useCallback, useState } from 'react';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import StudyDetail from './StudyDetail';
import useLoginModal from '@/hooks/useLoginModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import MyInfoCard from './MyInfoCard';
import { getHistDates } from '@/libs/plannerFunc';

interface StudyWrapperProps {
  study: SafeStudy & {
    leader: SafeUser;
  };
  currentUser?: SafeUser | null;
  studyRegistrations?: StudyRegistrationWithStudy[];
}

const StudyWrapper: FC<StudyWrapperProps> = ({
  study,
  currentUser,
  studyRegistrations = [],
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const histDates = getHistDates(
    study.startDate,
    study.endDate,
    new Date(),
    study.meetingDay
  );

  const onRegister = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);
    axios
      .post('/api/studyRegister', {
        studyId: study.id,
      })
      .then(() => {
        toast.success('스터디 신청이 완료되었습니다!');
        router.refresh();
      })
      .catch(() => {
        toast.error('스터디 신청에 실패했습니다.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, loginModal, router, study.id]);

  return (
    <div className='max-w-screen-lg mx-auto px-10 py-24'>
      <div className='flex flex-col gap-6'>
        <div className=' w-full h-[60vh] overflow-hidden rounded-xl relative drop-shadow-md'>
          <Image
            src={study.imageSrc || '/images/default_study_img.jpg'}
            alt='Study represent image'
            fill
            className='object-cover w-full'
          />
          <div className='absolute top-5 right-5'>
            <HeartButton listingId={study.id} currentUser={currentUser} />
          </div>
        </div>

        <div className='flex flex-wrap gap-6'>
          <StudyDetail
            title={study.title}
            subtitle={study.subtitle}
            category={study.category}
            description={study.description}
            currentPeople={
              studyRegistrations.filter((reg) => reg.accepted).length
            }
            maxPeople={study.maxPeople}
            meetingCount={study.meetingCount}
            meetingDay={study.meetingDay}
            type={study.type}
            latePenalty={study.latePenalty}
            absentPenalty={study.absentPenalty}
            city={study.city}
            district={study.district}
            startDate={study.startDate}
            endDate={study.endDate}
          />
          <MyInfoCard
            studyId={study.id}
            leader={study.leader}
            currentUserId={currentUser?.id}
            studyRegistrations={studyRegistrations}
            maxPeople={study.maxPeople}
            histDates={histDates}
            onSubmit={onRegister}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default StudyWrapper;
