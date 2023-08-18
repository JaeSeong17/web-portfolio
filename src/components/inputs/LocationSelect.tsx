'use client';

import { cities } from '@/libs/locationsList';
import { FC } from 'react';
import Select from 'react-select';

export type LocationSelectValue = {
  label: string;
  value: string;
};

interface LocationSelectProps {
  placeholder: string;
  options: string[];
  value: LocationSelectValue | null;
  onChange: (value: LocationSelectValue) => void;
}

const LocationSelect: FC<LocationSelectProps> = ({
  placeholder,
  options,
  value,
  onChange,
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <Select
        placeholder={placeholder}
        isClearable
        options={options.map((option) => ({ value: option, label: option }))}
        value={value}
        onChange={(value) => onChange(value as LocationSelectValue)}
        formatOptionLabel={(option: any) => <div>{option.label}</div>}
        classNames={{
          control: () => 'p-1 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      />
    </div>
  );
};

export default LocationSelect;
