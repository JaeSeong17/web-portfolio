import { getHistDate } from '@/libs/plannerFunc';

test('스터디 시작일부터 현재까지 진행된 미팅 날짜 리스트', () => {
  const expectedDates = [
    [],
    [new Date(2023, 5, 3), new Date(2023, 5, 10)],
    [
      new Date(2023, 5, 3),
      new Date(2023, 5, 10),
      new Date(2023, 5, 17),
      new Date(2023, 5, 24),
      new Date(2023, 6, 1),
    ],
  ];

  const startDate = new Date(2023, 5, 1);
  const endDate = new Date(2023, 6, 1);
  const currDates = [
    new Date(2023, 4, 1),
    new Date(2023, 5, 10),
    new Date(2023, 6, 10),
  ];
  const meetingDay = [6];

  const histDates: Array<Array<Date>> = [];
  currDates.forEach((currDate) => {
    const histDate = getHistDate(startDate, endDate, currDate, meetingDay);
    histDates.push(histDate);
  });

  expect(histDates).toEqual(expectedDates);
});
