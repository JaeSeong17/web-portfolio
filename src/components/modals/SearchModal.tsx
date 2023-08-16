'use client';

import useSearchModal from '@/hooks/useSearchModal';
import Modal from './Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import qs from 'query-string';
import Heading from '../Heading';
import Counter from '../inputs/Counter';
import LocationSelect from '../inputs/LocationSelect';
import { cities, districts } from '@/libs/locationsList';
import CheckSlider from '../inputs/CheckSlider';
import KakaoMap from '../KakaoMap';

enum STEPS {
  LOCATION = 0,
  TYPE = 1,
  MAXPEOPLE = 2,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [city, setCity] = useState<{ value: string; label: string } | null>(
    null
  );
  const [district, setDistrict] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [address, setAddress] = useState('');
  const [type, setType] = useState('무관');
  const [maxPeople, setMaxPeople] = useState(1);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.MAXPEOPLE) {
      return onNext();
    }

    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      city: city ? city.value : null,
      district: district ? district.value : null,
      type: type === '무관' ? null : type,
      maxPeople,
    };

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    city,
    district,
    maxPeople,
    onNext,
    params,
    router,
    searchModal,
    step,
    type,
  ]);

  useEffect(() => {
    let str = '';
    if (city) {
      str += city.value;
    }
    if (district) {
      str += ' ' + district.value;
    }

    setAddress(str);
  }, [city, district]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.MAXPEOPLE) {
      return '검색';
    } else {
      return '다음';
    }
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    } else {
      return '이전';
    }
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='어느 지역의 Study를 찾으시나요?'
        subtitle='찾으시는 Study의 지역을 알려주세요.'
      />
      <LocationSelect
        placeholder='지역 무관'
        options={cities}
        value={city}
        onChange={(value) => setCity(value)}
      />
      {city && (
        <LocationSelect
          placeholder='시/군/구 무관'
          options={districts[city.value]}
          value={district}
          onChange={(value) => setDistrict(value)}
        />
      )}
      <hr />
      <KakaoMap address={address} />
    </div>
  );

  if (step === STEPS.TYPE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='어떤 방식의 스터디를 원하세요?'
          subtitle='운영 방식을 선택할 수 있어요.'
        />
        <CheckSlider
          title='대면/비대면 선택'
          subtitle='어떤 방식으로 운영되나요?'
          values={['무관', '대면', '비대면', '유연']}
          onChange={(value) => setType(value)}
        />
      </div>
    );
  }

  if (step === STEPS.MAXPEOPLE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='어느정도의 스터디 규모를 원하세요?'
          subtitle='스터디 최대 인원 수를 선택할 수 있어요.'
        />
        <Counter
          title='인원 수'
          subtitle='최대 몇 명의 스터디를 찾으시나요?'
          value={maxPeople}
          onChange={(value) => setMaxPeople(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title='검색 필터'
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
