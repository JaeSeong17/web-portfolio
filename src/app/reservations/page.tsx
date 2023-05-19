import EmptyState from '@/components/EmptyState';
import getCurrentUser from '../../actions/getCurrentUser';
import getReservations from '../../actions/getReservation';
import ReservationClient from './ReservationClient';

export default async function ReservationPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title='로그인이 필요한 페이지 입니다.'
        subtitle='로그인 후 다시 시도해주세요.'
      />
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title='예약 정보가 없습니다.'
        subtitle='새로운 Space를 찾으러 가볼까요?'
      />
    );
  }

  return (
    <ReservationClient reservations={reservations} currentUser={currentUser} />
  );
}
