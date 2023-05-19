'use client';

import { FC } from 'react';
import Container from '../Container';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: '해변가 근처에 위치한 Space',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: '풍차가 있는 Space',
  },
  {
    label: 'Modren',
    icon: MdOutlineVilla,
    description: '현대식 건축이 아름다운 Space',
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: '시골 풍경과 함께하는 Space',
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: '수영장이 있는 Space',
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: '섬에 있는 Space',
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: '계곡이 보이는 Space',
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: '스키장 주변의 Space',
  },
  {
    label: 'Castle',
    icon: GiCastle,
    description: '성 분위기가 나는 Space',
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: '숲속의 Space',
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: '항상 눈이 있는 Space',
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: '동굴 관광과 함께하는 Space',
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: '사막 지역의 Space',
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: '오두막이 있는 Space',
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: '럭셔리한 Space',
  },
];

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = ({}) => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
