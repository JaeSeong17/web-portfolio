import EmptyState from '@/components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoritesClient from './FavoritesClient';

export default async function FavoirtesPage() {
  const currentUser = await getCurrentUser();
  const favoriteListings = await getFavoriteListings();

  if (!currentUser) {
    return (
      <EmptyState
        title='로그인이 필요한 페이지입니다.'
        subtitle='로그인 후 다시 시도해주세요.'
      />
    );
  }

  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title='좋아요를 누른 Space가 없네요.'
        subtitle='마음에 드는 Space에 좋아요를 눌러보세요.'
      />
    );
  }

  return (
    <FavoritesClient
      favoriteListings={favoriteListings}
      currentUser={currentUser}
    />
  );
}
