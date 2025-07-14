import type { FC } from 'react';
import { Heading } from '../ui/Heading';
import { Row } from '../ui/Row';
import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';

export const Settings: FC = () => {
  return (
    <Row $type="vertical">
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
};
