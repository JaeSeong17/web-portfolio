import getCurrentUser from '@/actions/getCurrentUser';
import getListingById from '@/actions/getListingById';
import EmptyState from '@/components/EmptyState';
import ListingClient from './ListingClient';
import getReservations from '@/actions/getReservation';

interface IParams {
  listingId?: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </>
  );
}
