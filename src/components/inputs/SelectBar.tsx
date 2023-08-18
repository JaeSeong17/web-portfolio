import { FC } from 'react';

interface SelectBarProps {
  values: string[];
  select: number;
  onChange: (index: number) => void;
  disabled?: boolean;
}

const SelectBar: FC<SelectBarProps> = ({
  values,
  select,
  onChange,
  disabled,
}) => {
  return (
    <div
      className={`flex gap-2 rounded-lg justify-between ${
        disabled && 'opacity-50'
      }`}
    >
      {values.map((value, index) => (
        <div
          key={value}
          className={`w-10 h-8 rounded-xl font-bold flex items-center justify-center
          ${!disabled && 'hover:border border-red-500 cursor-pointer'}
          ${select === index && 'bg-red-600'}  
          ${select === index && 'text-white'}
          `}
          onClick={() => onChange(index)}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default SelectBar;
