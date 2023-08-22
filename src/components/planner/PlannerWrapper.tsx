import { FC } from 'react';
import PlannerDetail from './PlannerDetail';
import MemberCard from './MemberCard';
import { getHistDates } from '@/libs/plannerFunc';
import {
  JournalWithFeedbacks,
  SafeStudy,
  SafeUser,
  StudyRegistrationWithStudy,
} from '@/types';

interface PlannerWrapperProps {
  study: SafeStudy;
  currentUser: SafeUser;
  studyRegistrations: StudyRegistrationWithStudy[];
  journals: JournalWithFeedbacks[];
}

const PlannerWrapper: FC<PlannerWrapperProps> = ({
  study,
  currentUser,
  studyRegistrations,
  journals,
}) => {
  const memberRegistrations = studyRegistrations
    .filter((reg) => reg.accepted)
    .reverse();

  const histDates = getHistDates(
    study.startDate,
    study.endDate,
    new Date(),
    study.meetingDay
  );

  return (
    <div className='max-w-screen-lg mx-auto px-4 sm:px-10 py-24'>
      <div className='flex flex-col md:flex-1 md:flex-row gap-4'>
        <div className='md:flex-1'>
          <PlannerDetail
            study={study}
            currentUser={currentUser}
            memberRegistrations={memberRegistrations}
            journals={journals}
            histDates={histDates}
          />
        </div>

        <div className='md:w-[300px] flex flex-col gap-y-2'>
          {memberRegistrations.map((reg) => (
            <MemberCard
              key={reg.id}
              studyRegistration={reg}
              histDates={histDates}
              meetingDay={study.meetingDay}
              startDate={study.startDate}
              endDate={study.endDate}
              latePenalty={study.latePenalty}
              absentPenalty={study.absentPenalty}
              authorized={study.leaderId === currentUser?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlannerWrapper;
