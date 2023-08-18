import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ListingCardSkeleton: FC = ({}) => {
  return (
    <div className='flex flex-col gap-2 w-full h-100'>
      <Skeleton className='aspect-square w-full rounded-xl' />
      <Skeleton className='w-full overflow-hidden rounded-xl' />
      <Skeleton className='w-full overflow-hidden rounded-xl' />
      <Skeleton className='w-full overflow-hidden rounded-xl' />
    </div>
  );
};

export default ListingCardSkeleton;
