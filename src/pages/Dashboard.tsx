import type { FC } from 'react';
import { Heading } from '../ui/Heading';
import { Row } from '../ui/Row';

export const Dashboard: FC = () => {
  return (
    <Row $type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <p>TEST</p>
    </Row>
  );
};
