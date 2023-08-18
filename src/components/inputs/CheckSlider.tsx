'use client';

import { FC, useCallback, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface CheckSliderProps {
  title: string;
  subtitle: string;
  values: Array<string>;
  onChange: (value: string) => void;
}

const CheckSlider: FC<CheckSliderProps> = ({
  title,
  subtitle,
  values,
  onChange,
}) => {
  const [index, setIndex] = useState(0);
  const onNext = useCallback(() => {
    if (index >= values.length - 1) {
      return;
    }
    setIndex(index + 1);
    onChange(values[index]);
  }, [index, onChange, values]);

  const onPrev = useCallback(() => {
    if (index === 0) {
      return;
    }
    setIndex(index - 1);
    onChange(values[index]);
  }, [index, onChange, values]);

  return (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
      <div className='flex flex-col place-self-start'>
        <div className='font-medium'>{title}</div>
        <div className='font-light'>{subtitle}</div>
      </div>
      <div className='flex flex-row items-center justify-between w-[50%] sm:w-[30%] place-self-end'>
        <div
          onClick={onPrev}
          className='w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition'
        >
          <AiOutlineLeft />
        </div>
        <div>{values[index]}</div>
        <div
          onClick={onNext}
          className='w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition'
        >
          <AiOutlineRight />
        </div>
      </div>
    </div>
  );
};

export default CheckSlider;
