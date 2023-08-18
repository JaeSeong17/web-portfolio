import getCurrentUser from '@/actions/getCurrentUser';
import getJournalsByStudyId from '@/actions/getJournalsByStudyId';
import getStudyById from '@/actions/getStudyById';
import getStudyRegistrations from '@/actions/getStudyRegistrations';
import EmptyState from '@/components/EmptyState';
import MemberCard from '@/components/planner/MemberCard';
import PlannerDetail from '@/components/planner/PlannerDetail';
import { getHistDates } from '@/libs/plannerFunc';

interface IParams {
  studyId: string;
}

export default async function PlannerPage({ params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const study = await getStudyById(params);
  const studyRegistrations = await getStudyRegistrations(params);
  const journals = await getJournalsByStudyId(params);
  const memberRegistrations = studyRegistrations
    .filter((reg) => reg.accepted)
    .reverse();

  if (!currentUser) {
    return (
      <EmptyState
        title='플래너 로드 실패!'
        subtitle='로그인이 필요한 페이지에요.'
      />
    );
  }

  if (!study) {
    return (
      <EmptyState
        title='플래너 로드 실패!'
        subtitle='해당 스터디 정보를 찾을 수 없어요.'
      />
    );
  }

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
}
