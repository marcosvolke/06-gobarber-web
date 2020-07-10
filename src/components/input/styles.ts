import styled from 'styled-components';

export const Container = styled.div`

  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  color: #666360;

  & + div {
      margin-top: 8px;
  }

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
