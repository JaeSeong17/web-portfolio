import { FC } from 'react';
import { RangeKeyDict } from 'react-date-range';
import { BiCoin, BiDetail } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import {
  HiOutlineLocationMarker,
  HiOutlinePresentationChartLine,
} from 'react-icons/hi';
import { SiGotomeeting } from 'react-icons/si';
import KakaoMap from '../KakaoMap';
import Calendar from '../inputs/Calendar';
import { AiOutlineCalendar } from 'react-icons/ai';

interface StudyDetailProps {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  currentPeople: number;
  maxPeople: number;
  meetingCount: number;
  meetingDay: number[];
  type: string;
  latePenalty: number;
  absentPenalty: number;
  city: string;
  district: string;
  startDate: Date;
  endDate: Date;
}

const StudyDetail: FC<StudyDetailProps> = ({
  title,
  subtitle,
  category,
  description,
  currentPeople,
  maxPeople,
  meetingCount,
  meetingDay,
  type,
  latePenalty,
  absentPenalty,
  city,
  district,
  startDate,
  endDate,
}) => {
  const parsedDesc = description.split('\n');
  const parsedMeetingDay = ['일', '월', '화', '수', '목', '금', '토']
    .filter((day, index) => meetingDay.includes(index))
    .join(', ');

  return (
    <div className='flex-1 min-w-screen-sm max-w-screen-xl flex flex-col gap-6'>
      {/* header */}
      <div className='text-start'>
        <div className='text-4xl font-bold'>{title}</div>
        <div className='text-xl text-light text-neutral-500 mt-2'>
          {category}, {subtitle}
        </div>
      </div>

      <hr className='w-full h-[1px] bg-gray-500' />

      {/* description */}
      <div className='flex flex-col text-start gap-2'>
        <div className='flex items-center gap-4 text-lg'>
          <BsPeople size={30} />
          <div className='font-bold'>인원 수</div>
          현재 {currentPeople}명 / 최대 {maxPeople}명
        </div>
        <div className='flex items-center gap-4 text-lg'>
          <SiGotomeeting size={30} />
          <div className='font-bold'>미팅 수</div>주 {meetingCount}회 진행 (
          {parsedMeetingDay})
        </div>
        <div className='flex items-center gap-4 text-lg'>
          <HiOutlinePresentationChartLine size={30} />
          <div className='font-bold'>진행 방식</div>
          {type}
        </div>
        <div className='flex items-center gap-4 text-lg'>
          <BiCoin size={30} />
          <div className='font-bold'>벌금</div>
          지각 : {latePenalty} / 결석 : {absentPenalty}
        </div>
      </div>

      <hr className='w-full h-[1px] bg-gray-500' />

      {/* description */}
      <div className='flex items-center gap-4 text-lg font-bold'>
        <BiDetail size={30} />
        세부 설명
      </div>
      <div>
        {parsedDesc.map((desc, idx) => (
          <div key={idx}>{desc}</div>
        ))}
      </div>

      <hr className='w-full h-[1px] bg-gray-500' />

      {/* calendar */}
      <div className='flex items-center gap-4 text-lg'>
        <AiOutlineCalendar size={30} />
        <div className='font-bold'>스터디 기간: </div>
        {Intl.DateTimeFormat('kr').format(startDate)} ~{' '}
        {Intl.DateTimeFormat('kr').format(endDate)}
      </div>
      <Calendar
        value={{ startDate: startDate, endDate: endDate }}
        onChange={(value: RangeKeyDict) => {}}
      />

      <hr className='w-full h-[1px] bg-gray-500' />

      {/* map */}
      <div className='flex items-center gap-4 text-xl font-bold'>
        <HiOutlineLocationMarker size={28} />
        {city}, {district}
      </div>
      <KakaoMap address={city + ' ' + district} />
    </div>
  );
};

export default StudyDetail;
