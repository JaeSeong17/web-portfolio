import {
  JournalWithFeedbacks,
  StudyRegistrationWithStudy,
  StudyRegistrationWithoutStudy,
} from '@/types';
import { Attend } from '@prisma/client';
import { getDay, isSameDay } from 'date-fns';

export const getHistDates = (
  startDate: Date,
  endDate: Date,
  currDate: Date,
  meetingDate: number[]
) => {
  if (currDate.getTime() < startDate.getTime()) {
    return [];
  }

  const nextDates = [];
  const finalDate = endDate.getTime() < currDate.getTime() ? endDate : currDate;
  let nextDate = new Date(startDate.valueOf());
  while (nextDate.getTime() <= finalDate.getTime()) {
    if (meetingDate.includes(getDay(nextDate))) {
      nextDates.push(new Date(nextDate.valueOf()));
    }
    nextDate.setDate(nextDate.getDate() + 1);
  }

  return nextDates;
};

export const checkAttendable = (
  startDate: Date,
  endDate: Date,
  meetingDay: number[],
  attends: Attend[]
) => {
  const today = new Date();
  return (
    startDate.getTime() <= today.getTime() && // 오늘이 스터디 시작일 이후인지
    today.getTime() <= endDate.getTime() && // 오늘이 스터디 종료일 이전인지
    meetingDay.includes(getDay(today)) && // 스터디 미팅 지정 요일인지
    !attends.find((attend) => isSameDay(attend.date, today)) // 출석 체크 했는지
  );
};

export const getAttendRate = (attends: Attend[], histDates: Date[]) => {
  return histDates.length === 0
    ? 0
    : Math.round((attends.length / histDates.length) * 100);
};

export const getTotalAttendRate = (
  memberRegistrations: StudyRegistrationWithoutStudy[],
  histDates: Date[]
) => {
  const sumAttendRate = memberRegistrations.reduce(
    (acc, currReg) => acc + getAttendRate(currReg.attends, histDates),
    0
  );
  return sumAttendRate / memberRegistrations.length;
};

export const getPenalty = (
  attends: Attend[],
  histDates: Date[],
  latePenalty: number,
  absentPenalty: number
) => {
  const absentCount = histDates.length - attends.length;
  const lateCount = attends.filter((attend) => attend.state === 2).length;

  return absentCount * absentPenalty + lateCount * latePenalty;
};

export const getAttendChartData = (
  histDates: Date[],
  memberRegistrations: StudyRegistrationWithStudy[]
) => {
  return histDates.map((histDate) => {
    let count = 0;
    memberRegistrations.forEach(
      (reg) =>
        (count += reg.attends.find((attend) => isSameDay(attend.date, histDate))
          ? 1
          : 0)
    );
    return Math.round((count / memberRegistrations.length) * 100);
  });
};

export const getSatisfactionChartData = (journals: JournalWithFeedbacks[]) => {
  return journals.map((journal) => {
    let sumSatisfaction = 0;
    let count = 0;
    journal.feedbacks.map((fb) => {
      if (fb.satisfaction === -1) return;
      sumSatisfaction += fb.satisfaction;
      count += 1;
    });
    return Math.round((sumSatisfaction / (count !== 0 ? count : 1)) * 25);
  });
};
