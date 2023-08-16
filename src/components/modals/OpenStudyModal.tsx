'use client';

import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import useOpenStudyModal from '@/hooks/useOpenStudyModal';
import { useRouter } from 'next/navigation';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import ImageUpload from '../inputs/ImageUpload';
import Counter from '../inputs/Counter';
import CheckSlider from '../inputs/CheckSlider';
import KakaoMap from '../KakaoMap';
import LocationSelect from '../inputs/LocationSelect';
import { cities, districts } from '@/libs/locationsList';
import Calendar from '../inputs/Calendar';
import { Range } from 'react-date-range';
import TextAreaInput from '../inputs/TextAreaInput';
import SelectDayBar from '../inputs/SelectDayBar';

enum STEPS {
  CATEGORY = 0,
  TITLE = 1,
  DESCRIPTION = 2,
  INFO = 3,
  PENALTY = 4,
  LOCATION = 5,
  CALENDAR = 6,
  IMAGES = 7,
}

export interface OpenStudyFormData {
  [x: string]: any;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  maxPeople: number;
  meetingCount: number;
  meetingDay: Array<number>;
  type: '대면' | '비대면' | '유연';
  latePenalty: number;
  absentPenalty: number;
  city: { value: string; label: string } | null;
  district: { value: string; label: string } | null;
  dateRange: Range;
  imageSrc: string;
}

const OpenStudyModal = ({}) => {
  const router = useRouter();
  const openStudyModal = useOpenStudyModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<OpenStudyFormData>({
    defaultValues: {
      category: '',
      title: '',
      subtitle: '',
      description: '',
      maxPeople: 1,
      meetingCount: 1,
      meetingDay: [],
      type: '대면',
      latePenalty: 0,
      absentPenalty: 0,
      city: null,
      district: null,
      dateRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
      imageSrc: '',
    },
  });

  const category = watch('category');
  const description = watch('description');
  const maxPeople = watch('maxPeople');
  const meetingCount = watch('meetingCount');
  const meetingDay = watch('meetingDay');
  const city = watch('city');
  const district = watch('district');
  const dateRange = watch('dateRange');
  const imageSrc = watch('imageSrc');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<OpenStudyFormData> = (data) => {
    if (step !== STEPS.IMAGES) {
      return onNext();
    }
    setIsLoading(true);
    axios
      .post('/api/studies', data)
      .then(() => {
        toast.success('새 스터디 등록에 성공했습니다!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        openStudyModal.onClose();
      })
      .catch(() => {
        toast.error('새 스터디 등록에 실패했습니다.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.IMAGES) {
      return '등록';
    }

    return '다음';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return '이전';
  }, [step]);

  // 스텝 단계에 따라 모달 창 내용 변경
  // 0: 카테고리 설정
  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='스터디의 카테고리는 무엇인가요?'
        subtitle='가장 가까운 카테고리를 선택해주세요.'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {categories.map((item) => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              onClick={(category) => {
                setCustomValue('category', category);
              }}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // 1: 스터디 소개
  if (step === STEPS.TITLE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='스터디의 이름은 무엇인가요?'
          subtitle='스터디 제목을 설정하세요.'
        />
        <Input
          id='title'
          label='스터디 제목'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id='subtitle'
          label='스터디 부제, 간략한 설명'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  // 2: 스터디 세부 설명
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-4'>
        <Heading
          title='스터디에 대해 자세히 알려주세요.'
          subtitle='스터디에 대한 설명을 입력하세요.'
        />
        <TextAreaInput
          id='description'
          label='스터디 설명'
          textCount={description.length}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  // 3: 스터디 설정
  const handleDaySelect = (value: number) => {
    if (meetingDay.includes(value)) {
      setCustomValue(
        'meetingDay',
        meetingDay.filter((idx) => idx !== value)
      );
      return;
    }
    if (meetingDay.length >= meetingCount) {
      return;
    }
    setCustomValue('meetingDay', [...meetingDay, value]);
  };

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-4'>
        <Heading
          title='스터디는 어떻게 구성되나요?'
          subtitle='스터디의 세부 설정을 확인하세요.'
        />

        <hr className='w-full h-[1px] bg-gray-300 border-0' />
        <Counter
          title='인원 수'
          subtitle='최대 몇 명으로 구성하나요?'
          value={maxPeople}
          onChange={(value) => setCustomValue('maxPeople', value)}
        />

        <hr className='w-full h-[1px] bg-gray-300 border-0' />
        <Counter
          title='모임 횟수'
          subtitle='한 주에 몇 번 모이나요?'
          value={meetingCount}
          onChange={(value) => setCustomValue('meetingCount', value)}
        />
        <SelectDayBar
          values={['일', '월', '화', '수', '목', '금', '토']}
          selects={meetingDay}
          onChange={(value) => handleDaySelect(value)}
        />
        <hr className='w-full h-[1px] bg-gray-300 border-0' />
        <CheckSlider
          title='대면/비대면 선택'
          subtitle='어떤 방식으로 운영되나요?'
          values={['대면', '비대면', '유연']}
          onChange={(value) => setCustomValue('type', value)}
        />
      </div>
    );
  }

  // 4: 패널티 설정
  if (step === STEPS.PENALTY) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='스터디 지각을 막고 참여도를 높여요.'
          subtitle='스터디 벌금을 설정하세요.'
        />
        <Input
          id='latePenalty'
          label='지각 벌금'
          type='number'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          formatPrice
        />
        <Input
          id='absentPenalty'
          label='결석 벌금'
          type='number'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          formatPrice
        />
      </div>
    );
  }

  // 5: 지역 설정
  const [address, setAddress] = useState('');
  useEffect(() => {
    let str = '';
    if (city) {
      str += city.value;
    } else {
      setValue('district', null);
    }
    if (district) {
      str += ' ' + district.value;
    }
    setAddress(str);
  }, [address, city, district, setValue]);

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-6'>
        <Heading
          title='스터디가 어디에서 진행되나요?'
          subtitle='스터디 지역구를 선택해주세요.'
        />
        <div className='flex flex-col gap-2'>
          <LocationSelect
            placeholder='도/특별시/광역시'
            options={cities}
            value={city}
            onChange={(value) => setCustomValue('city', value)}
          />
          {city && city.value !== '세종특별자치시' && (
            <LocationSelect
              placeholder='시/군/구'
              options={districts[city.value]}
              value={district}
              onChange={(value) => setCustomValue('district', value)}
            />
          )}
        </div>

        <KakaoMap address={address} />
      </div>
    );
  }

  // 6: 기간 설정
  if (step === STEPS.CALENDAR) {
    bodyContent = (
      <div className='flex flex-col gap-6'>
        <Heading
          title='스터디 기간을 설정해주세요.'
          subtitle='기간을 설정하지 않으면 무기한으로 설정됩니다.'
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setCustomValue('dateRange', value.selection)}
        />
      </div>
    );
  }

  // 7: 사진 추가
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='스터디 관련 사진을 첨부해주세요.'
          subtitle='어떤 스터디인지 알아보기 쉽게 대표 이미지를 등록해주세요.'
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    );
  }

  return (
    <Modal
      title='새로운 스터디 등록'
      isOpen={openStudyModal.isOpen}
      onClose={openStudyModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default OpenStudyModal;
