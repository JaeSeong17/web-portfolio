import getCurrentUser from '@/actions/getCurrentUser';
import getJournalsByStudyId from '@/actions/getJournalsByStudyId';
import getStudyById from '@/actions/getStudyById';
import getStudyRegistrations from '@/actions/getStudyRegistrations';
import EmptyState from '@/components/EmptyState';
import PlannerWrapper from '@/components/planner/PlannerWrapper';

interface IParams {
  studyId: string;
}

export default async function PlannerPage({ params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const study = await getStudyById(params);
  const studyRegistrations = await getStudyRegistrations(params);
  const journals = await getJournalsByStudyId(params);

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

  return (
    <PlannerWrapper
      study={study}
      currentUser={currentUser}
      studyRegistrations={studyRegistrations}
      journals={journals}
    />
  );
}
