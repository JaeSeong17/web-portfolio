import EmptyState from '@/components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservation';
import TripsClient from './TripsClient';

export default async function TripsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title='로그인이 필요한 페이지입니다.'
        subtitle='로그인 후 다시 시도해주세요.'
      />
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title='예약 정보가 없습니다.'
        subtitle='새로운 여행을 계획해 볼까요?'
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
}
