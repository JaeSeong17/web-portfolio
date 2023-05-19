import EmptyState from '@/components/EmptyState';
import getCurrentUser from '../../actions/getCurrentUser';
import getListings from '../../actions/getListings';
import PropertiesClient from './PropertiesClient';

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title='로그인이 필요한 페이지입니다.'
        subtitle='로그인 후 다시 시도해주세요.'
      />
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <EmptyState
        title='예약 정보가 없습니다.'
        subtitle='새로운 여행을 계획해 볼까요?'
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
}
