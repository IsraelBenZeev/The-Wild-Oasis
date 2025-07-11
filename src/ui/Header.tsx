import type { FC } from 'react';
import styled from 'styled-components';
const StyledHesder = styled.header`
  background-color: var(--color-gray-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

export const Header: FC = () => {
  return <StyledHesder>HEADER</StyledHesder>;
};
