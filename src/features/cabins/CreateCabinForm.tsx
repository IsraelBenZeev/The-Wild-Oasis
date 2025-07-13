import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Input } from '../../ui/Input';
import Form from '../../ui/Form';
import { Button } from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import type { Dispatch, FC, SetStateAction } from 'react';
import type { CabinType } from '../../types/CabinType';
import { creatEditCabin } from '../../services/apiCabins';
import { FormRow } from '../../ui/FormRow';
import { id } from 'date-fns/locale';

export const CreateCabinForm: FC<{
  cabinToEdit?: CabinType;
  onSetShowFormEdit: Dispatch<React.SetStateAction<boolean>>;
}> = ({ cabinToEdit = {}, onSetShowFormEdit }) => {
  const { id: editID, ...editValues } = cabinToEdit!;
  const isEditSession = Boolean(editID);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  console.log(errors);
  const queryClient = useQueryClient();
  const { mutate: creatCabin, isPending: isCreating } = useMutation({
    mutationFn: (newCabin: CabinType) => creatEditCabin(newCabin),
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
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
      onSetShowFormEdit(false);
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const isWorking = isCreating || isEditing;
  const onSubmit = (data) => {
    console.log('data from on submit', data);
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession) editCabin({ newCabin: { ...data, image }, editID });
    else creatCabin({ ...data, image: image });
    // editCabin;
  };
  const onError = (erros) => {
    console.log(erros);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow name="name" labal="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', { required: 'This field required' })}
        />
      </FormRow>

      <FormRow
        labal="Maxomum capacity"
        error={errors?.maxCapacity?.message}
        name="maxCapacity"
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field required',
            min: {
              value: 1,
              message: 'Capa citiy should be least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        labal="Regular price"
        error={errors?.regularPrice?.message}
        name="regularPrice"
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field required',
            min: {
              value: 1,
              message: 'Regular price should be least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        labal="Doscount"
        error={errors?.discount?.message}
        name="discount"
      >
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field required',
            validate: (value) =>
              value <= getValues('regularPrice') ||
              'Discount should be less then regular price',
          })}
        />
      </FormRow>

      <FormRow
        labal="Description for website"
        error={errors?.description?.message}
        name="description"
      >
        <Textarea
          $type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', { required: 'This field required' })}
        />
      </FormRow>

      <FormRow labal="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
};
