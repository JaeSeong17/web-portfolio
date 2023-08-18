import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

interface LineChartProps {
  title: string;
  labels: string[];
  data: number[];
  type: 'attend' | 'satisfaction';
}

const getSatisfactionLabels = (value: number | string) => {
  if (value === 0) {
    return '최하';
  } else if (value === 25) {
    return '하';
  } else if (value === 50) {
    return '중';
  } else if (value === 75) {
    return '상';
  } else if (value === 100) {
    return '최상';
  } else {
    return value;
  }
};

const LineChart: FC<LineChartProps> = ({ title, labels, data, type }) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        borderColor: 'rgb(220, 38, 38)',
        backgroundColor: 'rgba(220, 38, 38, 0.5)',
      },
    ],
  };
  return (
    <div className='rounded-lg p-2 bg-white drop-shadow'>
      <Line
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: title,
            },
          },
          scales: {
            y: {
              suggestedMax: 100,
              suggestedMin: 0,
              ticks: {
                callback:
                  type === 'satisfaction' ? getSatisfactionLabels : undefined,
                stepSize: 25,
              },
            },
          },
        }}
        data={chartData}
      />
    </div>
  );
};

export default LineChart;
