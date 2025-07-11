import styled, { css } from 'styled-components';
type RowProps = {
  $type?: 'vertical' | 'horizontal';
};

export const Row = styled.div<RowProps>`
  display: flex;
  ${(props) =>
    props.$type === 'horizontal' &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.$type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.6px;
    `}
`;
Row.defaultProps = {
  $type: 'vertical',
};
