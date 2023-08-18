import { StudyRegistrationWithoutStudy } from '@/types';
import { FC, MouseEvent, useCallback, useState } from 'react';
import Button from '../Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface NewApplyCardProps {
  data: StudyRegistrationWithoutStudy;
}

const NewApplyCard: FC<NewApplyCardProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onReject = useCallback(
    (id: string) => {
      setLoading(true);
      axios
        .delete(`/api/studyRegister/${id}`)
        .then(() => {
          toast.success('스터디 신청을 거부했습니다.');
          router.refresh();
        })
        .catch(() => {
          toast.error('스터디 신청을 거부하지 못했습니다.');
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [router]
  );

  const onAccept = useCallback(
    (id: string) => {
      setLoading(true);
      axios
        .patch(`/api/studyRegister/accept/${id}`)
        .then(() => {
          toast.success('스터디 신청을 승인했습니다.');
          router.refresh();
        })
        .catch(() => {
          toast.error('스터디 신청을 승인하지 못했습니다.');
        })
        .finally(() => {
          setLoading(false);
        });
    },

    [router]
  );

  return (
    <div className='w-[300px]'>
      <div className='w-full rounded-xl border drop-shadow-xl p-6 bg-white flex flex-col gap-2'>
        <div className='text-lg font-semibold'>스터디 신청</div>
        <hr className='w-full h-[1px] bg-gray-400' />

        <div className=''>신청자: {data.user.name}</div>
        <div className=''>Email: {data.user.email}</div>

        <hr className='w-full h-[1px] bg-gray-400' />
        <div className='flex gap-2'>
          <Button
            small
            outline
            label={'거부'}
            disabled={loading}
            onClick={() => onReject(data.id)}
          />
          <Button
            small
            label={'수락'}
            disabled={loading}
            onClick={() => onAccept(data.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default NewApplyCard;
