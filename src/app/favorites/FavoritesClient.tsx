import Container from '@/components/Container';
import Heading from '@/components/Heading';
import StudyCard from '@/components/studies/StudyCard';
import { SafeUser } from '@/types';
import { Study } from '@prisma/client';
import { FC } from 'react';

interface FavoritesClientProps {
  favoriteStudies: Study[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: FC<FavoritesClientProps> = ({
  favoriteStudies,
  currentUser,
}) => {
  return (
    <Container>
      <div className='pt-24'>
        <Heading title='관심있는 Study' subtitle='하트를 누른 Study입니다.' />
        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {favoriteStudies.map((study) => (
            <StudyCard currentUser={currentUser} key={study.id} data={study} />
          ))}
        </div>
      </div>
      s
    </Container>
  );
};

export default FavoritesClient;
