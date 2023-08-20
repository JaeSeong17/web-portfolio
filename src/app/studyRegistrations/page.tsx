import getCurrentUser from '@/actions/getCurrentUser';
import getStudyRegistrations from '@/actions/getStudyRegistrations';
import EmptyState from '@/components/EmptyState';
import StudyRegistrationsWrapper from '@/components/studies/StudyRegistrationsWrapper';

export default async function StudyRegistrationsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title='로그인이 필요한 페이지입니다.'
        subtitle='로그인 후 다시 시도해주세요.'
      />
    );
  }

  const myStudyRegistrations = await getStudyRegistrations({
    currentUserId: currentUser.id,
    includeStudy: true,
  }).then((regs) => {
    return regs.filter((reg) => reg.study.leaderId !== currentUser.id);
  });

  if (myStudyRegistrations.length === 0) {
    return (
      <EmptyState
        title='등록 신청한 Study가 없네요.'
        subtitle='관심있는 Study를 찾아 신청해보세요.'
      />
    );
  }

  return (
    <StudyRegistrationsWrapper
      myStudyRegistrations={myStudyRegistrations}
      currentUser={currentUser}
    />
  );
}
