import { useMutation, useQueryClient } from '@tanstack/react-query';
import { creatEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import type { CabinType } from '../../types/CabinType';

export const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: creatCabin, isPending: isCreating } = useMutation({
    mutationFn: (newCabin: CabinType) => creatEditCabin(newCabin),
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    //   reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isCreating, creatCabin };
};
