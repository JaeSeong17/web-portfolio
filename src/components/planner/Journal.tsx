import { FC, MouseEvent, useEffect, useRef, useState } from 'react';
import { BsJournalText, BsPencilSquare } from 'react-icons/bs';
import CalendarPlanner from '../inputs/CalendarPlanner';
import {
  JournalWithFeedbacks,
  SafeStudy,
  SafeUser,
  StudyRegistrationWithStudy,
} from '@/types';
import { format } from 'date-fns';
import SelectBar from '../inputs/SelectBar';
import { useFetchJournal } from '@/hooks/useFetchJournal';
import Button from '../Button';
import { useMutationJournal } from '@/hooks/useMutationJournal';
import { Feedback } from '@prisma/client';

interface JournalProps {
  study: SafeStudy;
  currentUser: SafeUser;
  memberRegistrations: StudyRegistrationWithStudy[];
  histDates: Date[];
}

const Journal: FC<JournalProps> = ({
  study,
  currentUser,
  memberRegistrations,
  histDates,
}) => {
  const [summaryEdit, setSummaryEdit] = useState(false);
  const [commentEdit, setCommentEdit] = useState(false);
  const [date, setDate] = useState(
    histDates.length > 0 ? histDates[histDates.length - 1] : study.startDate
  );
  const [satisfaction, setSatisfaction] = useState(-1);
  const [summaryInput, setSummaryInput] = useState({
    title: '',
    content: '',
  });
  const [commentInput, setCommentInput] = useState('');

  const commentRef = useRef<HTMLInputElement>(null);

  const {
    isLoading,
    isError,
    refetch: refetchJournal,
    data: response,
    error,
  } = useFetchJournal({
    studyId: study.id,
    date,
  });

  const writeJournal = useMutationJournal('writeJournal');
  const updateJournal = useMutationJournal('updateJournal');
  const updateFeedback = useMutationJournal('updateFeedback');
  const updateSatisfaction = useMutationJournal('updateSatisfaction');

  useEffect(() => {
    setSummaryEdit(false);
    setCommentEdit(false);
    refetchJournal();
  }, [date, refetchJournal]);

  useEffect(() => {
    if (response?.data) {
      setSummaryInput({
        title: response.data.title,
        content: response.data.content,
      });
      const myFeedback = response.data.feedbacks.find(
        (fb: Feedback) => fb.userId === currentUser.id
      );
      setCommentInput(myFeedback?.content);
      setSatisfaction(myFeedback?.satisfaction);
    } else {
      setSummaryInput({
        title: '',
        content: '',
      });
      setCommentInput('');
      setSatisfaction(-1);
    }
  }, [currentUser.id, response]);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <BsJournalText size={28} />
        <span className='text-xl font-semibold'>스터디 일지</span>
      </div>
      <CalendarPlanner
        selectedDate={date}
        markedDate={histDates}
        onChange={(value) => setDate(value)}
        startDate={study.startDate}
        endDate={study.endDate}
      />

      {/* 일별 기록지 */}
      <div className='flex flex-col gap-4'>
        <div className='text-xl font-semibold'>
          {format(date, 'yyyy.MM.dd')} 기록
        </div>
        <div className='w-full rounded-lg drop-shadow bg-white overflow-hidden px-4 py-2 flex flex-col gap-2'>
          {summaryEdit ? (
            <>
              <div className='flex gap-1'>
                <input
                  className='w-full px-2 py-1 rounded-lg border border-black text-xl font-semibold'
                  value={summaryInput.title}
                  placeholder='이 날의 주제를 기록해요.'
                  onChange={(e) =>
                    setSummaryInput({ ...summaryInput, title: e.target.value })
                  }
                />
              </div>

              <hr className='w-full h-[1px] bg-gray-500' />
              <textarea
                className='w-full p-2 rounded-lg border border-black'
                placeholder='이 날의 내용을 기록해요.'
                value={summaryInput.content}
                maxLength={200}
                rows={5}
                onChange={(e) =>
                  setSummaryInput({ ...summaryInput, content: e.target.value })
                }
              />
              <div className='flex gap-1 justify-end'>
                <Button
                  small
                  width='w-[50px]'
                  label='완료'
                  onClick={() => {
                    if (!response?.data) {
                      writeJournal.mutate({
                        studyId: study.id,
                        date,
                        ...summaryInput,
                      });
                    } else {
                      updateJournal.mutate({
                        journalId: response.data.id,
                        ...summaryInput,
                      });
                    }
                    setSummaryEdit(false);
                  }}
                />
                <Button
                  small
                  outline
                  width='w-[50px]'
                  label='취소'
                  onClick={() => {
                    setSummaryInput({
                      title: response?.data.title,
                      content: response?.data.content,
                    });
                    setSummaryEdit(false);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className='text-xl font-semibold flex justify-between'>
                {response?.data?.title
                  ? response.data.title
                  : '이 날의 주제를 기록해요.'}
                <BsPencilSquare
                  size={24}
                  className='cursor-pointer'
                  onClick={() => setSummaryEdit(true)}
                />
              </div>

              <hr className='w-full h-[1px] bg-gray-500' />
              <div>
                {response?.data?.content
                  ? response.data.content
                      .split('\n')
                      .map((str: any, idx: any) => {
                        console.log(str);
                        return <div key={idx}>{str}</div>;
                      })
                  : '이 날의 내용을 기록해요.'}
              </div>
            </>
          )}
        </div>

        {!response?.data && (
          <div className='text-sm text-center'>
            오늘의 한마디, 활동 평가 입력을 위해 일지를 먼저 작성해주세요!
          </div>
        )}

        <div className={response?.data ? 'opacity-100' : 'opacity-50'}>
          <table className='w-full rounded-lg drop-shadow bg-white overflow-hidden'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='w-[20%] md:w-[15%]'>Name</th>
                <th>이 날의 한마디</th>
              </tr>
            </thead>
            <tbody>
              {memberRegistrations.map((reg) => {
                const feedback = response?.data?.feedbacks.find(
                  (fb: Feedback) => fb.userId === reg.userId
                );
                const editable = reg.userId === currentUser.id;

                return (
                  <tr key={reg.id}>
                    <td className='text-center'>{reg.user.name}</td>
                    {response?.data && editable ? (
                      commentEdit ? (
                        <td className='flex gap-1'>
                          <input
                            ref={commentRef}
                            className='w-full px-1 rounded-md border border-black'
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                          />
                          <Button
                            small
                            width='w-[50px]'
                            label='입력'
                            onClick={() => {
                              updateFeedback.mutate({
                                feedbackId: feedback.id,
                                content: commentInput,
                              });
                              setCommentEdit(false);
                            }}
                          />
                        </td>
                      ) : (
                        <td
                          className='hover:bg-gray-100 cursor-pointer'
                          onClick={() => setCommentEdit(true)}
                        >
                          {feedback?.content}
                        </td>
                      )
                    ) : (
                      <td>{feedback?.content}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div
          className={`flex flex-col gap-2 px-4 py-2 rounded-lg  drop-shadow bg-white overflow-hidden
           ${!response?.data && 'opacity-50'}`}
        >
          <div className='font-bold'>이 날의 활동 평가</div>
          <hr className='w-full h-[1px] bg-gray-500' />
          <SelectBar
            disabled={!response?.data || updateSatisfaction.isLoading}
            values={['최하', '하', '중', '상', '최상']}
            select={satisfaction}
            onChange={(value: number) =>
              updateSatisfaction.mutate({
                feedbackId: response?.data.feedbacks?.find(
                  (fb: Feedback) => fb.userId === currentUser.id
                )?.id,
                satisfaction: value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Journal;
