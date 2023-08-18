'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { FC } from 'react';

const Logo: FC = ({}) => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/')}
      src={'/images/logo-b.png'}
      alt={'Logo'}
      className='hidden md:block cursor-pointer w-auto h-auto'
      height={100}
      width={100}
      priority
    />
  );
};

export default Logo;
