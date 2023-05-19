'use client';

import Image from 'next/image';
import { FC } from 'react';

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className='rounded-full'
      height={30}
      width={30}
      src={src || '/images/placeholder.png'}
      alt={'Avatar'}
    />
  );
};

export default Avatar;
