import getCurrentUser from '@/actions/getCurrentUser';
import getStudyById from '@/actions/getStudyById';
import getStudyRegistrations from '@/actions/getStudyRegistrations';
import EmptyState from '@/components/EmptyState';
import StudyWrapper from '@/components/studies/StudyWrapper';

interface IParams {
  studyId?: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const study = await getStudyById(params);
  const currentUser = await getCurrentUser();
  const studyRegistrations = await getStudyRegistrations(params);

  if (!study) {
    return <EmptyState />;
  }

  return (
    <>
      <StudyWrapper
        study={study}
        currentUser={currentUser}
        studyRegistrations={studyRegistrations}
      />
    </>
  );
}
