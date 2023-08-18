import axios from 'axios';
import { useQuery } from 'react-query';

interface fetchJournalsParams {
  studyId: string;
}

export function useFetchJournals({ studyId }: fetchJournalsParams) {
  const queryResult = useQuery(
    'readJournals',
    async () => await axios.get(`/api/journals/read/${studyId}`),
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
