import axios from 'axios';
import { useQuery } from 'react-query';

interface fetchJournalParams {
  studyId: string;
  date: Date;
}

export function useFetchJournal({ studyId, date }: fetchJournalParams) {
  const queryResult = useQuery(
    'readJournal',
    async () =>
      await axios.get(`/api/journal/read/${studyId}/${date.toISOString()}`),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        console.log('journal read success', data);
      },
      onError: (e: any) => {
        console.log(e);
      },
    }
  );

  return queryResult;
}
