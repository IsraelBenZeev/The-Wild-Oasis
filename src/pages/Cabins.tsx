import { useEffect, type FC } from 'react';
import { Heading } from '../ui/Heading';
import { Row } from '../ui/Row';
import { getCabins } from '../services/apiCabins';
import { CabinTable } from '../features/cabins/CabinTable';

export const Cabins: FC = () => {
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
    </>
  );
};
