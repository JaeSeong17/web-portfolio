'use client';

import { StudyRegistrationWithoutStudy } from '@/types';
import { FC, useState } from 'react';
import Avatar from '../Avatar';
import Button from '../Button';
import { checkAttendable, getAttendRate, getPenalty } from '@/libs/plannerFunc';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface MemberCardProps {
  studyRegistration: StudyRegistrationWithoutStudy;
  meetingDay: number[];
  histDates: Date[];
  startDate: Date;
  endDate: Date;
  latePenalty: number;
  absentPenalty: number;
  authorized: boolean;
}

const MemberCard: FC<MemberCardProps> = ({
  studyRegistration,
  meetingDay,
  histDates,
  startDate,
  endDate,
  latePenalty,
  absentPenalty,
  authorized,
}) => {
  const { user, attends } = studyRegistration;
  const attendable = checkAttendable(
    startDate,
    endDate,
    meetingDay,
    studyRegistration.attends
  );
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onAttend = (late: boolean) => {
    setIsLoading(true);
    axios
      .post('/api/studyRegister/attend', {
        studyRegistrationId: studyRegistration.id,
        late,
      })
      .then(() => {
        toast.success('출석 체크에 성공했습니다!');
        router.refresh();
      })
      .catch(() => {
        toast.error('출석 체크에 실패했습니다. 다시 시도해주세요');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='w-full rounded-lg bg-white drop-shadow-lg'>
      <div className='p-4 flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2'>
            <Avatar src={user.image} />
            <span className='text-lg font-semibold'>{user.name}</span>
          </div>
          {authorized && (
            <div className='flex gap-2'>
              <Button
                small
                width={'w-[50px]'}
                label='출석'
                disabled={!attendable || isLoading}
                onClick={() => onAttend(false)}
              />
              <Button
                small
                width={'w-[50px]'}
                label='지각'
                outline
                disabled={!attendable || isLoading}
                onClick={() => onAttend(true)}
              />
            </div>
          )}
        </div>
        <hr className='w-full h-[1px] bg-gray-400' />
        <span className='text-sm'>Email: {user.email}</span>
        <span className='text-sm'>
          출석률: {getAttendRate(attends, histDates)}%
        </span>
        <span className='text-sm'>
          벌금 현황:{' '}
          {getPenalty(attends, histDates, latePenalty, absentPenalty)}원
        </span>
      </div>
    </div>
  );
};

export default MemberCard;
