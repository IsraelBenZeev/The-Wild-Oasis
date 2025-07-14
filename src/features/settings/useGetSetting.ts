import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

export const useGetSetting = () => {
  const { data:settings, isPending, error } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });
  console.log('settings: ',settings)
  return {settings, isPending, error}
};
