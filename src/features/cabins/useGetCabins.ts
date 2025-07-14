import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export const useGetCabins = () => {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });
  return { isPending, error, cabins };
};
