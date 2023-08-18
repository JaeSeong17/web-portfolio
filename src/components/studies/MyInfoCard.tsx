'use client';

import { FC } from 'react';
import Button from '../Button';
import { BsInfoSquare } from 'react-icons/bs';
import { SafeUser, StudyRegistrationWithoutStudy } from '@/types';
import NewApplyCard from './NewApplyCard';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/hooks/useLoginModal';
import { getTotalAttendRate } from '@/libs/plannerFunc';

interface MyInfoCardProps {
  studyId: string;
  leader: SafeUser;
  currentUserId?: string;
  studyRegistrations: StudyRegistrationWithoutStudy[];
  maxPeople: number;
  histDates: Date[];
  disabled?: boolean;
  onSubmit: () => void;
}

const MyInfoCard: FC<MyInfoCardProps> = ({
  studyId,
  leader,
  currentUserId,
  studyRegistrations,
  maxPeople,
  histDates,
  disabled,
  onSubmit,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const isLeader = leader.id === currentUserId;
  const myStudyRegistration = studyRegistrations.find(
    (reg) => reg.userId === currentUserId
  );
  const memberRegistrations = studyRegistrations.filter((reg) => reg.accepted);
  const applyRegistrations = studyRegistrations.filter((reg) => !reg.accepted);
  const registerable = memberRegistrations.length < maxPeople;
  const totalAttendRate = getTotalAttendRate(studyRegistrations, histDates);

  const leaderForm = (
    <>
      <div className='text-sm'>
        <div className='font-semibold'>스터디 멤버 정보</div>
        <ul className='list-disc list-inside'>
          {memberRegistrations.map((reg) => (
            <li key={reg.id}>
              {reg.user.name}
              {leader.id === reg.user.id && '(리더)'}/{reg.user.email}
            </li>
          ))}
        </ul>
      </div>

      <div className='text-sm'>
        <div className='font-semibold'>
          미팅 진행 횟수 : {histDates.length}회
        </div>
      </div>

      <div className='text-sm'>
        <div className='font-semibold'>스터디 참여율 : {totalAttendRate}%</div>
      </div>

      <hr className='w-full h-[1px] bg-gray-400' />
      <Button
        small
        label='스터디 플래너'
        onClick={() => router.push(`/planner/${studyId}`)}
      />
    </>
  );

  const memberForm = (
    <>
      <>
        <div className='text-sm'>
          <div className='font-semibold'>스터디 멤버 정보</div>
          <ul className='list-disc list-inside'>
            {memberRegistrations.map((reg) => (
              <li key={reg.id}>
                {reg.user.name}
                {leader.id === reg.user.id && '(리더)'}/{reg.user.email}
              </li>
            ))}
          </ul>
        </div>

        <div className='text-sm'>
          <div className='font-semibold'>
            미팅 진행 횟수 : {histDates.length}회
          </div>
        </div>

        <div className='text-sm'>
          <div className='font-semibold'>
            스터디 참여율 : {totalAttendRate}%
          </div>
        </div>

        <hr className='w-full h-[1px] bg-gray-400' />
        <Button
          small
          label='스터디 플래너'
          onClick={() => router.push(`/planner/${studyId}`)}
        />
      </>
    </>
  );

  const waitingForm = (
    <>
      <div
        className='
      animate-pulse text-4xl text-rose-500 font-bold text-center align-middle border-4 rounded-md border-rose-500 pt-2'
      >
        승인 대기중
      </div>
      <div className='text-sm'>
        스터디 등록 신청 후 리더의 승인을 기다리는 중입니다.
      </div>
    </>
  );

  const applyForm = (
    <>
      {currentUserId ? (
        <>
          <div className='text-sm'>이 스터디에 등록되어 있지 않습니다.</div>
          <div className='text-sm'>
            {registerable
              ? '현재 스터디에 등록 가능합니다.'
              : '현재 스터디에 등록 불가능합니다.'}
          </div>
          <Button label='등록신청' onClick={onSubmit} />
        </>
      ) : (
        <>
          <div className='text-sm'>
            스터디 정보를 보기 위해 로그인이 필요합니다.
          </div>
          <Button
            label='로그인
          '
            onClick={() => loginModal.onOpen()}
          />
        </>
      )}
    </>
  );

  return (
    <div className='w-[300px] flex flex-col gap-4'>
      <div className='w-full rounded-xl border drop-shadow-xl p-6 bg-white flex flex-col gap-2'>
        <div className='flex gap-2 items-center text-lg font-bold'>
          <BsInfoSquare size={24} />내 스터디 정보 -{' '}
          {isLeader ? '리더' : '멤버'}
        </div>
        <hr className='w-full h-[1px] bg-gray-400' />
        {myStudyRegistration
          ? myStudyRegistration.accepted
            ? memberForm
            : waitingForm
          : applyForm}
      </div>
      {isLeader &&
        applyRegistrations.map((reg) => (
          <NewApplyCard key={reg.id} data={reg} />
        ))}
    </div>
  );
};

export default MyInfoCard;
