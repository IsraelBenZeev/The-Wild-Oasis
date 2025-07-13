import { useEffect, useState, type FC } from 'react';
import { Heading } from '../ui/Heading';
import { Row } from '../ui/Row';
import { getCabins } from '../services/apiCabins';
import { CabinTable } from '../features/cabins/CabinTable';
import { Button } from '../ui/Button';
import { CreateCabinForm } from '../features/cabins/CreateCabinForm';

export const Cabins: FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>
      <Row $type="vertical">
        <CabinTable />
        <Button onClick={() => setShowForm((currentValue) => !currentValue)}>
          {showForm ? 'Close form' : 'Add new cabin'}
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
};
