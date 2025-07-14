import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCreateCabin } from './useCreateCabin';
import type { CabinType } from '../../types/CabinType';
import { creatEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { creatCabin, isCreating } = useCreateCabin();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({
      newCabin,
      editID,
    }: {
      newCabin: CabinType;
      editID: number;
    }) => creatEditCabin(newCabin, editID),
    onSuccess: () => {
      toast.success('Cabin successfully edited');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      //   onSetShowFormEdit(false);
      //   reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isEditing, editCabin };
};
