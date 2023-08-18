// export const dynamic = 'force-dynamic';

import Container from '@/components/Container';
import getCurrentUser from '../actions/getCurrentUser';
import StudiesWrapper from '@/components/studies/StudiesWrapper';
import { IStudiesParams } from '@/hooks/useFetchStudies';

interface HomeProps {
  searchParams: IStudiesParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <StudiesWrapper currentUser={currentUser} searchParams={searchParams} />
    </Container>
  );
}
