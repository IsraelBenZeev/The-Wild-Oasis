import { useState, type FC } from 'react';
import styled from 'styled-components';
import type { CabinType } from '../../types/CabinType';
import { formatCurrency } from '../../utils/helpers';
import { CreateCabinForm } from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

export const CabinRow: FC<{ cabin: CabinType }> = ({ cabin }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const {
    image,
    created_at,
    description,
    discount,
    id: cabinId,
    maxCapacity,
    name,
    regularPrice,
  } = cabin;

  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { creatCabin, isCreating } = useCreateCabin();
  const handkeDuplicate = () => {
    console.log('image duplicate: ', image);
    creatCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      description,
      discount,
      image,
    });
  };
  return (
    <>
      <TableRow role="row">
        <Img src={image}></Img>
        <Cabin>{name}</Cabin>
        <div>{maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? <Discount>{discount}</Discount> : <span>&mdash;</span>}
        <div>
          <button onClick={handkeDuplicate} disabled={isCreating}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm((currentValue) => !currentValue)}>
            {showForm ? <HiPencil /> : <HiPencil />}
          </button>
          <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
            {isDeleting ? <HiTrash /> : <HiTrash />}
          </button>
        </div>
      </TableRow>
      {showForm && (
        <CreateCabinForm onSetShowFormEdit={setShowForm} cabinToEdit={cabin} />
      )}
    </>
  );
};
