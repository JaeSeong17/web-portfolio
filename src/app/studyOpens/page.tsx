import getCurrentUser from '@/actions/getCurrentUser';
import getStudies from '@/actions/getStudies';
import EmptyState from '@/components/EmptyState';
import StudyOwnsWrapper from '@/components/studies/StudyOwnsWrapper';

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

  const ownStudies = await getStudies({ leaderId: currentUser.id });

  if (ownStudies.length === 0) {
    return (
      <EmptyState
        title='개설한 Study가 없네요.'
        subtitle='새로운 Study를 개설하여 사람을 모아보세요.'
      />
    );
  }

  return <StudyOwnsWrapper ownStudies={ownStudies} currentUser={currentUser} />;
}
