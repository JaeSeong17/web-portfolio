'use client';

import {
  JournalWithFeedbacks,
  SafeStudy,
  SafeUser,
  StudyRegistrationWithStudy,
} from '@/types';
import { FC } from 'react';
import { format, isSameDay } from 'date-fns';
import { BsGraphUp } from 'react-icons/bs';
import LineChart from '../LineChart';
import Journal from './Journal';
import { useFetchJournals } from '@/hooks/useFetchJournals';
import Statistics from './Statistics';

interface PlannerDetailProps {
  study: SafeStudy;
  currentUser: SafeUser;
  memberRegistrations: StudyRegistrationWithStudy[];
  journals: JournalWithFeedbacks[];
  histDates: Date[];
}

const PlannerDetail: FC<PlannerDetailProps> = ({
  study,
  currentUser,
  memberRegistrations,
  journals,
  histDates,
}) => {
  return (
    <div className='flex flex-col bg-white drop-shadow-lg p-4 gap-4'>
      {/* title */}
      <div>
        <div className='text-4xl font-bold'>{study.title}</div>
        <div className='text-lg text-gray-400'>
          {study.category}, {study.subtitle}
        </div>
      </div>
      <hr className='w-full h-[1px] bg-gray-400' />
      <Journal
        study={study}
        currentUser={currentUser}
        memberRegistrations={memberRegistrations}
        histDates={histDates}
      />
      <hr className='w-full h-[1px] bg-gray-400' />
      {/* graph */}
      <Statistics
        histDates={histDates}
        memberRegistration={memberRegistrations}
        journals={journals}
      />
    </div>
  );
};

export default PlannerDetail;
