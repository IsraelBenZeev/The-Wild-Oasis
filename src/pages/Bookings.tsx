import type { FC } from 'react';
import { Heading } from '../ui/Heading';
import { Row } from '../ui/Row';

export const Bookings: FC = () => {
  return (
    <Row $type="horizontal">
      <Heading as="h1">All bookings</Heading>
      <p>TEST</p>
    </Row>
  );
};
