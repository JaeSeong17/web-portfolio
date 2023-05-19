'use client';

import EmptyState from '@/components/EmptyState';
import { FC, useEffect } from 'react';

interface ErrorStateProps {
  error: Error;
}

const ErrorState: FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <EmptyState title='어라?' subtitle='뭔가 잘못된 것 같아요!' />;
};

export default ErrorState;
