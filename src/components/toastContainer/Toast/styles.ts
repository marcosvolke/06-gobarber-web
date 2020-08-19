import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasdescription: number;
}

const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;

  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  /* efeito de sombra: */
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  /* muda alinhamento para horizontal dos elementos: */
  display: flex;

  /* Toast q antes dele tem um outro toast vai ter margin acima: */
  & + div {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'info']}

  /* pega primeiro svg (dentro do toast) e não pega svg dentro do button */
  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    /* pra ocupar o tamanho máximo disponível */
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    /* o toast é relative justamente pra ter esse absolute dentro */
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props => !props.hasdescription && css`
    align-items: center;

    svg {
      margin-top: 0;

    }
  `}
`;
