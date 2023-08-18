import { FC } from 'react';

interface SelectDayBarProps {
  values: string[];
  selects: number[];
  onChange: (index: number) => void;
}

const SelectDayBar: FC<SelectDayBarProps> = ({ values, selects, onChange }) => {
  return (
    <div className='flex gap-2 rounded-lg p-1 justify-between bg-rose-50'>
      {values.map((value, index) => (
        <div
          key={value}
          className={`w-10 h-8 rounded-xl hover:border border-red-500 cursor-pointer font-bold flex items-center justify-center
          ${selects.includes(index) && 'bg-red-600'}  
          ${selects.includes(index) && 'text-white'}  
          `}
          onClick={() => onChange(index)}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default SelectDayBar;
