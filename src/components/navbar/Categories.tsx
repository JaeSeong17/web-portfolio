'use client';

import { FC } from 'react';
import Container from '../Container';
import { BsPeople } from 'react-icons/bs';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';
import { BiCreditCardFront, BiMobileAlt } from 'react-icons/bi';
import {
  AiOutlineDatabase,
  AiOutlineFundProjectionScreen,
} from 'react-icons/ai';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { SiThealgorithms } from 'react-icons/si';

export const categories = [
  {
    label: 'FrontEnd',
    icon: BiCreditCardFront,
    description: '웹 프론트엔드 개발 스터디',
  },
  {
    label: 'BackEnd',
    icon: AiOutlineDatabase,
    description: '웹 백엔드 개발 스터디',
  },
  {
    label: 'App',
    icon: BiMobileAlt,
    description: '앱 개발 스터디',
  },
  {
    label: 'CS',
    icon: HiOutlineDesktopComputer,
    descripton: '컴퓨터 전공 지식 스터디',
  },
  {
    label: 'Algorithm',
    icon: SiThealgorithms,
    descripton: '알고리즘 & 코딩테스트 스터디',
  },
  {
    label: 'Interview',
    icon: BsPeople,
    description: '인성 & 기술 면접 스터디',
  },
  {
    label: 'ToyProject',
    icon: AiOutlineFundProjectionScreen,
    description: '사이드 프로젝트 팀원 모집',
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
      <div className='pt-2 flex flex-row items-center justify-between overflow-x-auto'>
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
