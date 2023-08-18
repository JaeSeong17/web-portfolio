import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

export interface IStudiesParams {
  userId?: string;
  category?: string;
  city?: string;
  district?: string;
  maxPeople?: number;
  type?: string;
}

export interface StudiesQueryParams extends IStudiesParams {
  id?: string;
  studiesCount: number;
}

export function useFetchStudies({
  searchParams,
  studiesCount,
}: {
  searchParams: IStudiesParams;
  studiesCount: number;
}) {
  const queryResult = useInfiniteQuery({
    queryKey: ['studies', studiesCount],
    queryFn: ({ pageParam = '' }) =>
      get({ id: pageParam, studiesCount, ...searchParams }),

    getNextPageParam: (studies) => {
      return studies ? studies[studies.length - 1].id : undefined;
    },
  });
  return queryResult;
}

async function get(queryParams: StudiesQueryParams) {
  return await axios
    .get('/api/studies', {
      params: { ...queryParams },
    })
    .then((response) => (response.data.length > 0 ? response.data : undefined));
}
