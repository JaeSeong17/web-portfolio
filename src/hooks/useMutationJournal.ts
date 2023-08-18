import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

interface MutationJournalParams {
  studyId?: string;
  date?: Date;
  journalId?: string;
  title?: string;
  content?: string;
}

interface MutationFeedbackParams {
  feedbackId?: string;
  content?: string;
  satisfaction?: number;
}

const writeJournal = async (params: MutationJournalParams) => {
  return await axios.post('/api/journal/write', params);
};

const updateJournal = async (params: MutationJournalParams) => {
  return await axios.patch('/api/journal/update', params);
};

const updateFeedback = async (params: MutationFeedbackParams) => {
  return await axios.patch('/api/journal/feedback/update', params);
};

const updateSatisfaction = async (params: MutationFeedbackParams) => {
  return await axios.patch('/api/journal/satisfaction/update', params);
};

export function useMutationJournal(
  mode:
    | 'writeJournal'
    | 'updateJournal'
    | 'updateFeedback'
    | 'updateSatisfaction'
) {
  const queryClient = useQueryClient();
  let mutationFn: (
    params: MutationJournalParams | MutationFeedbackParams
  ) => Promise<AxiosResponse<any, any>>;
  if (mode === 'writeJournal') {
    mutationFn = writeJournal;
  } else if (mode === 'updateJournal') {
    mutationFn = updateJournal;
  } else if (mode === 'updateFeedback') {
    mutationFn = updateFeedback;
  } else {
    mutationFn = updateSatisfaction;
  }

  const mutation = useMutation(
    (params: MutationJournalParams | MutationFeedbackParams) =>
      mutationFn(params),
    {
      onSuccess: () => {
        if (mode === 'writeJournal') {
          toast.success('일지 작성에 성공했습니다.');
        } else if (mode === 'updateJournal') {
          toast.success('일지 수정에 성공했습니다.');
        } else if (mode === 'updateFeedback') {
          toast.success('오늘의 한마디 수정에 성공했습니다.');
        } else {
          toast.success('활동 평가 입력에 성공했습니다.');
        }
        queryClient.invalidateQueries('readJournal');
      },
      onError: () => {
        if (mode === 'writeJournal') {
          toast.error('일지 작성이 실패했습니다.');
        } else if (mode === 'updateJournal') {
          toast.error('일지 수정이 실패했습니다.');
        } else if (mode === 'updateFeedback') {
          toast.error('오늘의 한마디 수정이 실패했습니다.');
        } else {
          toast.error('활동 평가 입력에 실패했습니다.');
        }
      },
    }
  );
  return mutation;
}
