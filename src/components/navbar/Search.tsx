'use client';

import useSearchModal from '@/hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import { FC, useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const city = params?.get('city');
  const district = params?.get('district');
  const type = params?.get('type');
  const maxPeople = params?.get('maxPeople');

  const locationLabel = useMemo(() => {
    let address = '';
    if (city) {
      address += city;
    }
    if (district) {
      address += ' ' + district;
    }
    return address === '' ? '어디든지' : address;
  }, [city, district]);

  const typeLabel = useMemo(() => {
    return type ? type : '어떻게든';
  }, [type]);

  const maxPeopleLabel = useMemo(() => {
    return maxPeople ? maxPeople + ' 명' : '몇명이든';
  }, [maxPeople]);

  return (
    <div
      onClick={searchModal.onOpen}
      className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'
    >
      <div className='flex flex-rwo items-center justify-between'>
        <div className='text-sm font-semibold px-6'>{locationLabel}</div>
        <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
          {typeLabel}
        </div>
        <div className='text-sm pl-6 pr-2 flex flex-row items-center gap-3'>
          <div className='hidden sm:block font-semibold'>{maxPeopleLabel}</div>
          <div className='p-2 bg-rose-500 rounded-full text-white'>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
