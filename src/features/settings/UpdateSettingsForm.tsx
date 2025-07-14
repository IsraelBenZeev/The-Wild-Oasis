import type { FC, FocusEvent } from 'react';
import Form from '../../ui/Form';
import { FormRow } from '../../ui/FormRow';
import { Input } from '../../ui/Input';
import { useGetSetting } from './useGetSetting';
import Spinner from '../../ui/Spinner';
import { useUpdateSetting } from './useUpdateSetting';

export const UpdateSettingsForm: FC = () => {
  const { error, isPending, settings } = useGetSetting();
  const { isUpdaing, updateSetting } = useUpdateSetting();

  if (isPending) return <Spinner />;
  const handleUpdate = (e: FocusEvent<HTMLInputElement>, field: string) => {
    e.preventDefault();
    const { value } = e.target;
    console.log(value);
    if (!value) return;
    updateSetting({ [field]: value });
  };
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={settings.minBookingLength}
          disabled={isUpdaing}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={settings.maxBookingLength}
          disabled={isUpdaing}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={settings.maxGuestsPerBooking}
          disabled={isUpdaing}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={settings.breakfastPrice}
          disabled={isUpdaing}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
};

export default UpdateSettingsForm;
