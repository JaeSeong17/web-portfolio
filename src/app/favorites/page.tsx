import EmptyState from '@/components/EmptyState';
import getCurrentUser from '../../actions/getCurrentUser';
import StudyFavoritesWrapper from '../../components/studies/StudyFavoritesWrapper';
import getFavoriteStudies from '../../actions/getFavoriteStudies';

export default async function FavoirtesPage() {
  const currentUser = await getCurrentUser();
  const favoriteStudies = await getFavoriteStudies();

  if (!currentUser) {
    return (
      <EmptyState
        title='로그인이 필요한 페이지입니다.'
        subtitle='로그인 후 다시 시도해주세요.'
      />
    );
  }

  if (favoriteStudies.length === 0) {
    return (
      <EmptyState
        title='좋아요를 누른 Space가 없네요.'
        subtitle='마음에 드는 Space에 좋아요를 눌러보세요.'
      />
    );
  }

  return (
    <StudyFavoritesWrapper
      favoriteStudies={favoriteStudies}
      currentUser={currentUser}
    />
  );
}
