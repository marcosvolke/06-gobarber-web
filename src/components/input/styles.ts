import styled, { css } from 'styled-components';

import Tooltip from '../tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`

  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  border: 2px solid #232129;
  color: #666360;

  & + div {
      margin-top: 8px;
  }

  ${props => props.isErrored && css`
    border-color: #C53030;
  `}

  /* Se foco está no componente troca cor e borda */
  ${props => props.isFocused && css`
    color: #FF9000;
    border-color: #FF9000;
  `}

  /* Se componente foi preenchido troca cor */
  ${props => props.isFilled && css`
    color: #FF9000;
  `}

  input {
    background: transparent;

    /* ocupa todo o espaço possível: */
    flex: 1;

    border: 0;
    color: #f4ede8;

    &::placeholder {
        color: #666360;
    }
  }

  /* pega o primeiro ícone dentro do container: */
  > svg {
    margin-right: 16px;
  }
`;

// estilizando um outro componente dentro do componente pai
export const Error = styled(Tooltip)`
  /* pra não mexer no tamanho do input: */
  height: 20px;

  /* texto do input manter distância do ícone: */
  margin-left: 16px;

  /* pra não ficar margem a direita do ícone: */
  svg {
    margin: 0;
  }

  /* estilização do tooltip pra deixar vermelho no caso de erro que é o container atual: */
  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
