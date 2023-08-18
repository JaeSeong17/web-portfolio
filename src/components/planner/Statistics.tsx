import { format } from 'date-fns';
import { FC } from 'react';
import { BsGraphUp } from 'react-icons/bs';
import LineChart from '../LineChart';
import { JournalWithFeedbacks, StudyRegistrationWithStudy } from '@/types';
import {
  getAttendChartData,
  getSatisfactionChartData,
} from '@/libs/plannerFunc';

interface StatisticsProps {
  histDates: Date[];
  memberRegistration: StudyRegistrationWithStudy[];
  journals: JournalWithFeedbacks[];
}

const Statistics: FC<StatisticsProps> = ({
  histDates,
  memberRegistration,
  journals,
}) => {
  const attendChartData = getAttendChartData(histDates, memberRegistration);
  const satisfactionChartData = getSatisfactionChartData(journals);
  console.log(journals);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <BsGraphUp size={28} />
        <span className=' text-xl font-semibold'>스터디 통계</span>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
        <LineChart
          type='attend'
          title={'스터디 참석률'}
          labels={histDates.map((histDate) => format(histDate, 'MM/dd'))}
          data={attendChartData}
        />
        <LineChart
          type='satisfaction'
          title={'스터디 만족도'}
          labels={journals.map((journal) => format(journal.date, 'MM/dd'))}
          data={satisfactionChartData}
        />
      </div>
    </div>
  );
};

export default Statistics;
