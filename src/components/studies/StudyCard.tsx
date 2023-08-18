'use client';

import { SafeUser } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useCallback, MouseEvent } from 'react';
import HeartButton from '../HeartButton';
import Button from '../Button';
import { Study, StudyRegistration } from '@prisma/client';

interface StudyCardProps {
  data: Study;
  registration?: StudyRegistration;
  disabled?: boolean;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const StudyCard: FC<StudyCardProps> = ({
  data,
  registration,
  disabled,
  onAction,
  actionId = '',
  actionLabel,
  currentUser,
}) => {
  const router = useRouter();

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  return (
    <div
      className='col-span-1 cursor-pointer group'
      onClick={() => router.push(`/study/${data.id}`)}
    >
      <div className='flex flex-col gap-2 w-full'>
        <div className='aspect-square w-full relative overflow-hidden rounded-xl drop-shadow-lg'>
          <Image
            fill
            alt='StudyRepresent'
            src={data.imageSrc}
            className='object-cover h-full w-full group-hover:scale-110 transition'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority
          />
          <div className='absolute top-3 right-3'>
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className='font-semibold text-lg'>
          {data.city}, {data.district}
        </div>
        <div className='font-semibold text-lg'>{data.title}</div>
        <div className='font-light text-neutral-500'>{data.category}</div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default StudyCard;
