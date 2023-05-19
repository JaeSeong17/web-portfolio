import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ListingCard from '@/components/listings/ListingCard';
import { SafeUser, SafeListing } from '@/types';
import { FC } from 'react';

interface FavoritesClientProps {
  favoriteListings: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: FC<FavoritesClientProps> = ({
  favoriteListings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title='관심있는 Space' subtitle='하트를 누른 Space입니다.' />
      <div className='mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {favoriteListings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
