'use client';

import { FC, useEffect, useRef, useState } from 'react';
import EmptyState from '../EmptyState';
import ListingCardSkeleton from './StudyCardSkeleton';
import { SafeUser } from '@/types';
import Observer from './Observer';
import StudyCard from './StudyCard';
import { IStudiesParams, useFetchStudies } from '@/hooks/useFetchStudies';

interface StudiesWrapperProps {
  currentUser: SafeUser | null;
  searchParams: IStudiesParams;
}

const StudiesWrapper: FC<StudiesWrapperProps> = ({
  currentUser,
  searchParams,
}) => {
  const [studiesCount, setStudiesCount] = useState(12);
  const scrollPositionRef = useRef(0);
  useEffect(() => {
    const updateStudiesCount = () => {
      const vw = window.innerWidth;
      if (vw >= 1536) {
        setStudiesCount(12);
      } else if (vw >= 1280) {
        setStudiesCount(10);
      } else if (vw >= 1024) {
        setStudiesCount(8);
      } else if (vw >= 768) {
        setStudiesCount(6);
      }
    };

    // 초기 로드 시 listingsCount 설정
    updateStudiesCount();

    // 뷰포트 크기 변경 시 listingsCount 업데이트
    window.addEventListener('resize', updateStudiesCount);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('resize', updateStudiesCount);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { data, hasNextPage, fetchNextPage, refetch, isFetching } =
    useFetchStudies({
      searchParams,
      studiesCount,
    });

  const handleIntersection = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch, searchParams, studiesCount]);

  if (!data?.pages[0] && !isFetching) {
    return <EmptyState showReset />;
  }

  const renderStudies = () => {
    if (data && data.pages) {
      const studies = data.pages.reduce((prev, studies) => {
        if (studies) prev.push(...studies);
        return prev;
      }, []);
      return studies.map((study: any) => (
        <StudyCard key={study.id} currentUser={currentUser} data={study} />
      ));
    }
  };

  return (
    <>
      <div
        className='
          pt-48
          grid 
          grid-cols-1 
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8'
      >
        {renderStudies()}
        {isFetching &&
          Array.from({ length: studiesCount }, (_, i) => i + 1).map((idx) => (
            <ListingCardSkeleton key={idx} />
          ))}
      </div>
      {hasNextPage && <Observer handleIntersection={handleIntersection} />}
    </>
  );
};

export default StudiesWrapper;
