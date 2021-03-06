import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CSSzIndex } from '~/@types/style';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.4);
  z-index: ${CSSzIndex.GLOBAL_MODAL};
`;

export interface AlignerProps {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}
export const Aligner = styled.div<AlignerProps>`
  display: flex;
  ${({ top, bottom, left, right }) => css`
    align-items: ${top ? 'flex-start' : bottom ? 'flex-end' : 'center'};
    justify-content: ${left ? 'flex-start' : right ? 'flex-end' : 'center'};
  `}

  width: 80%;
  height: 80%;
`;
