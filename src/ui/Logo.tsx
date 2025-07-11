import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

export const Logo: FC = () => {
  return (
    <Link to="/">
      <StyledLogo>
        <Img src="/img/logo-light.png" alt="Logo" />
      </StyledLogo>
    </Link>
  );
};
