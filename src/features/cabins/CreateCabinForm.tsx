import { useForm } from 'react-hook-form';
import { Input } from '../../ui/Input';
import Form from '../../ui/Form';
import { Button } from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import type { Dispatch, FC } from 'react';
import type { CabinType } from '../../types/CabinType';
import { FormRow } from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';
type CreateCabinFormProps = {
  cabinToEdit?: CabinType;
  onSetShowFormEdit: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateCabinForm: FC<CreateCabinFormProps> = ({
  cabinToEdit = {},
  onSetShowFormEdit,
}) => {
  const { id: editID, ...editValues } = cabinToEdit!;
  const isEditSession = Boolean(editID);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const { creatCabin, isCreating } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;
  const onSubmit = (data) => {
    console.log('data from on submit', data);
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { newCabin: { ...data, image }, editID },
        {
          onSuccess: () => {
            reset();
            onSetShowFormEdit(false);
          },
        }
      );
    else creatCabin({ ...data, image: image }, { onSuccess: () => reset() });
    // editCabin;
  };
  const onError = (erros) => {
    console.log(erros);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow name="name" label="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', { required: 'This field required' })}
        />
      </FormRow>

      <FormRow
        label="Maxomum capacity"
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
        label="Regular price"
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
        label="Discount"
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
        label="Description for website"
        error={errors?.description?.message}
        name="description"
      >
        <Textarea
          $type="number"
          id="description"
          defaultValue=""
          {...register('description', { required: 'This field required' })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
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
        <Button
          $variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
};
